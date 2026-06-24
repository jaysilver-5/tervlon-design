"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/dataSource";
import { qk } from "@/lib/query/keys";

export function useScenarios() {
  return useQuery({ queryKey: qk.scenarios, queryFn: () => api.listScenarios() });
}
