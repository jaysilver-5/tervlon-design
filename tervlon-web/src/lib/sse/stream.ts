/**
 * Fetch-based SSE reader. Native `EventSource` cannot send an Authorization header,
 * which is the single most common integration mistake against this backend — so we
 * read the stream with fetch + a ReadableStream parser and attach the bearer.
 *
 * The recovery rule the backend repeats everywhere: on reconnect, first replay
 * missed events (catch-up), THEN refetch the contract, THEN repaint. This reader
 * tracks the last event id and calls `onReconnect(lastEventId)` so the caller can
 * run that sequence.
 *
 * Cookie-auth is also supported (credentials: 'include'); if your tokens live in an
 * httpOnly cookie you can drop the bearer entirely.
 */
import { env } from "../env";
import { getAccessToken } from "../auth/session";

export interface RuntimeEventMessage {
  id: string;
  type?: string;
  data: {
    id: string;
    attemptId: string;
    sessionId: string;
    actor: string;
    type: string;
    payload: Record<string, unknown>;
    createdAt: string;
  };
}

export interface SseHandlers {
  onEvent: (msg: RuntimeEventMessage) => void;
  onOpen?: () => void;
  onError?: (err: unknown) => void;
  /** Called before a reconnect attempt with the last processed event id. */
  onReconnect?: (lastEventId: string | null) => void;
  heartbeatMs?: number;
}

/**
 * Subscribe to an SSE stream. Returns an unsubscribe function.
 * `streamPath` comes from `contract.eventTransport.streamUrl` — never hardcode it.
 */
export function subscribeToStream(
  streamPath: string,
  handlers: SseHandlers,
): () => void {
  let closed = false;
  let lastEventId: string | null = null;
  let controller: AbortController | null = null;
  let retry = 0;

  const connect = async () => {
    if (closed) return;
    controller = new AbortController();
    const headers: Record<string, string> = { Accept: "text/event-stream" };
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (lastEventId) headers["Last-Event-ID"] = lastEventId;

    try {
      const url = streamPath.startsWith("http")
        ? streamPath
        : `${env.apiBaseUrl}${streamPath}`;
      const res = await fetch(url, {
        headers,
        credentials: "include",
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error(`stream ${res.status}`);

      handlers.onOpen?.();
      retry = 0;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (!closed) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE frames are separated by a blank line.
        let sep: number;
        while ((sep = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, sep);
          buffer = buffer.slice(sep + 2);
          const msg = parseFrame(frame);
          if (msg) {
            lastEventId = msg.id ?? lastEventId;
            handlers.onEvent(msg);
          }
        }
      }
    } catch (err) {
      if (closed) return;
      handlers.onError?.(err);
    }

    if (!closed) {
      // Reconnect with backoff, then let the caller catch-up + refetch contract.
      handlers.onReconnect?.(lastEventId);
      retry = Math.min(retry + 1, 5);
      setTimeout(connect, 500 * 2 ** retry);
    }
  };

  void connect();

  return () => {
    closed = true;
    controller?.abort();
  };
}

function parseFrame(frame: string): RuntimeEventMessage | null {
  let id = "";
  const dataLines: string[] = [];
  let type: string | undefined;
  for (const line of frame.split("\n")) {
    if (line.startsWith("id:")) id = line.slice(3).trim();
    else if (line.startsWith("event:")) type = line.slice(6).trim();
    else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
  }
  if (!dataLines.length) return null;
  try {
    const data = JSON.parse(dataLines.join("\n"));
    return { id: id || data.id, type, data: data.data ?? data };
  } catch {
    return null;
  }
}
