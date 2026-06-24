"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { subscribeToStream } from "@/lib/sse/stream";
import { classifyTier, isRenderable } from "@/lib/events/tiers";
import { isLive } from "@/lib/env";
import { qk } from "@/lib/query/keys";
import type { EventTransport } from "@/lib/types";

/**
 * Wires the SSE stream to the cache, demonstrating the live event loop:
 *   event arrives → classify tier → (renderable) surface it → invalidate state.
 * On reconnect: catch-up, refetch contract, repaint (handled by invalidation).
 *
 * Inert in mock mode (no stream to open) — the integration shape is here and ready.
 */
export function useRuntimeEvents(
  sessionId: string,
  transport: EventTransport | undefined,
  onRenderable?: (tier: string, type: string, payload: unknown) => void,
) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!isLive || !transport?.streamUrl) return;

    const unsub = subscribeToStream(transport.streamUrl, {
      onEvent: (msg) => {
        const tier = classifyTier(
          msg.data.type,
          (msg.data.payload as { tier?: string })?.tier,
        );
        if (isRenderable(tier)) onRenderable?.(tier, msg.data.type, msg.data.payload);
        // Most events imply state changed — let queries refetch what they own.
        qc.invalidateQueries({ queryKey: qk.engineState(sessionId) });
        qc.invalidateQueries({ queryKey: qk.frontendContract(sessionId) });
      },
      onReconnect: () => {
        // catch-up-then-refetch-contract is the rule; invalidation triggers refetch.
        qc.invalidateQueries({ queryKey: qk.frontendContract(sessionId) });
      },
      heartbeatMs: transport.heartbeatMs,
    });

    return unsub;
  }, [sessionId, transport, qc, onRenderable]);
}
