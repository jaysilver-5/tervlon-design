import { QueryClient } from "@tanstack/react-query";

/** One QueryClient factory. SSE is the live channel, so polling is off by default. */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
