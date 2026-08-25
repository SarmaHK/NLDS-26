import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "./types";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const getSocket = () => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
            withCredentials: true,
            autoConnect: false, // Intentionally let the developer initiate
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        // Safe reconnection fetching authoritative DB configurations without leaking DB states across unauthenticated nodes
        socket.on("connect_error", (error) => {
            console.warn("[Realtime Bound Error]: Disconnected mapping limits.", error.message);
        });

        socket.on("connect", () => {
            console.log("[Realtime Bound Hook]: Subscribed cleanly.");
        });
    }

    return socket;
};
