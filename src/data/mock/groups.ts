import type { Group } from "@/lib/api/types";
import { GROUP_IDS } from "./teams";
import { MOCK_TEAMS } from "./teams";

export const MOCK_GROUPS: Group[] = GROUP_IDS.map((id) => ({
  id,
  name: `Group ${id}`,
  teamIds: MOCK_TEAMS.filter((t) => t.groupId === id).map((t) => t.id),
}));
