import { Workspace } from "@/features/runtime/workspace/Workspace";

/**
 * The runtime workspace — full-screen, no rail (matches the designed surface).
 * Renders on mock data today; the fixtures in src/mocks/workspace.ts are the swap
 * point for live engine-state + the frontend contract.
 */
export default function SprintPage({ params }: { params: { sessionId: string } }) {
  return <Workspace sessionId={params.sessionId} />;
}
