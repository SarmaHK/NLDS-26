import { env } from "@/lib/config/env";
import { ServerToClientEvents } from "@/lib/realtime/types";

class RealtimePublisher {
  private getBaseUrl() {
    return "http://localhost:3001"; // Natively bound abstraction mapping decoupled nodes
  }

  // Abstracting payload strict mapping internally bypassing 'any' natively mapping the typed routes explicitly
  public async emit<Event extends keyof ServerToClientEvents>(
    eventName: Event,
    payload: Parameters<ServerToClientEvents[Event]>[0],
    targetRoom?: string,
  ) {
    try {
      await fetch(`${this.getBaseUrl()}/internal/emit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authSecret: env.SESSION_SECRET,
          eventName,
          payload,
          targetRoom,
        }),
      });
    } catch (error) {
      console.error(
        `[Realtime Publisher Error] Failed syncing bounded WebSocket events: ${eventName}`,
      );
      // Note: Purposefully non-blocking. Database operates gracefully if WebSocket crashes.
    }
  }
}

export const realtimePublisher = new RealtimePublisher();
