import type { Fixture, MatchState } from "@/lib/api/types";
import { isPast, parseISO } from "date-fns";

export function isPredictionLocked(fixture: Fixture): boolean {
  if (fixture.state === "live" || fixture.state === "finished") return true;
  return isPast(parseISO(fixture.kickoffAt));
}

export function getMatchTabState(fixture: Fixture): MatchState {
  return fixture.state;
}

export function filterByTab(fixtures: Fixture[], tab: MatchState): Fixture[] {
  return fixtures.filter((f) => f.state === tab && !f.placeholder);
}
