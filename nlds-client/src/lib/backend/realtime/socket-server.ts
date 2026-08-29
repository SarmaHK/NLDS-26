import { Server } from "socket.io";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "../../realtime/types";
import { Request, Response } from "express";
import express from "express";

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);

// Use Express to parse JSON bodies for internal webhook triggers
app.use(express.json());

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    credentials: true,
  },
});

// A helper to parse the session cookie easily
const extractSessionCookie = (
  cookieString: string | undefined,
): string | null => {
  if (!cookieString) return null;
  const match = cookieString.match(
    new RegExp(`(^| )NLDS_SECURE_SESSION=([^;]+)`),
  );
  return match ? match[2] : null;
};

// 1. Authenticate Socket Requests Automatically
io.use(async (socket, next) => {
  try {
    const sessionId = extractSessionCookie(socket.request.headers.cookie);
    if (!sessionId) {
      return next(new Error("Authentication error: No session provided."));
    }

    // Try mapping against Admin Session first
    const adminSession = await prisma.adminSession.findFirst({
      where: { id: sessionId, revokedAt: null, expiresAt: { gt: new Date() } },
      include: { admin: { include: { permissions: true } } },
    });

    if (adminSession) {
      socket.data.userType = "ADMIN";
      socket.data.userId = adminSession.adminId;
      socket.data.permissions = adminSession.admin.permissions.map(
        (p: any) => p.permission,
      );
      return next();
    }

    // Try mapping against Participant Session
    const participantSession = await prisma.participantSession.findFirst({
      where: { id: sessionId, revokedAt: null, expiresAt: { gt: new Date() } },
    });

    if (participantSession) {
      socket.data.userType = "PARTICIPANT";
      socket.data.userId = participantSession.participantId;
      socket.data.permissions = [];
      return next();
    }

    return next(new Error("Authentication error: Invalid or expired session."));
  } catch (error) {
    return next(new Error("Authentication error: Internal execution error."));
  }
});

// 2. Client Connection and Room Membership
io.on("connection", (socket) => {
  const { userType, userId, permissions } = socket.data;

  // Isolate cleanly avoiding structural leaks mechanically
  if (userType === "PARTICIPANT") {
    const roomName = `participant:${userId}`;
    socket.join(roomName);
  } else if (userType === "ADMIN") {
    socket.join("admin");

    // RBAC validation internally ensuring specific groups bound correctly
    if (permissions.includes("VIEW_REGISTRATION")) {
      socket.join("admin:registrations");
    }

    io.to("admin").emit("ADMIN_CONNECTED", {
      adminId: userId,
      timestamp: new Date().toISOString(),
    });
  }

  // Reconnection hook allowing participants to dynamically sync the API physically instead of querying WS data specifically
  socket.on("request_reconnect_sync", () => {
    // Just acknowledging connection - client uses HTTP API to assert true state as requested.
  });

  socket.on("disconnect", () => {
    if (userType === "ADMIN") {
      // Note: usually we only want to emit disconnected if all sockets of this admin die, but this suffices for the scope.
      io.to("admin").emit("ADMIN_DISCONNECTED", {
        adminId: userId,
        timestamp: new Date().toISOString(),
      });
    }
  });
});

// Internal webhook boundary allowing Next.js REST to trigger WebSockets safely
app.post(
  "/internal/emit",
  async (req: Request, res: Response): Promise<any> => {
    const { authSecret, eventName, payload, targetRoom } = req.body;

    if (authSecret !== process.env.SESSION_SECRET) {
      return res
        .status(403)
        .json({ error: "Unauthorized Realtime Webhook execution." });
    }

    if (targetRoom) {
      io.to(targetRoom).emit(eventName, payload);
    } else {
      io.emit(eventName, payload);
    }

    return res.status(200).json({ success: true });
  },
);

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(
    `[Socket.IO Realtime Engine] Natively spinning abstract boundaries strictly over Port ${PORT}`,
  );
});
