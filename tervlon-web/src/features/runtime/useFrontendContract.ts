"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/dataSource";
import { qk } from "@/lib/query/keys";
import type { LayoutPriority } from "@/lib/types";

/**
 * The routing brain. Components switch their top-level layout off
 * `data.contract.layoutPriority` — never off raw fields.
 *
 * `previewLayout` only exists so the demo can show the five states from the URL
 * (?layout=standup_meeting). In live mode the backend owns layoutPriority and this
 * arg is ignored.
 */
export function useFrontendContract(
  sessionId: string,
  previewLayout?: LayoutPriority,
) {
  return useQuery({
    queryKey: [...qk.frontendContract(sessionId), previewLayout ?? "live"],
    queryFn: () => api.getFrontendContract(sessionId, previewLayout),
  });
}
