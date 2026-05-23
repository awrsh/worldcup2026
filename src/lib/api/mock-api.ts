import type {
  Fixture,
  FixtureFilters,
  Group,
  Team,
  Standing,
  BracketData,
  LeaderboardEntry,
  LeaderboardScope,
  Prediction,
} from "./types";
import { MOCK_TEAMS } from "@/data/mock/teams";
import { MOCK_GROUPS } from "@/data/mock/groups";
import { ALL_FIXTURES, getFixtureById } from "@/data/mock/fixtures";
import { MOCK_BRACKET } from "@/data/mock/bracket-edges";
import { MOCK_LEADERBOARD } from "@/data/mock/leaderboard";
import { computeStandings } from "@/lib/utils/standings";
import { isSameDay, parseISO } from "date-fns";

const DELAY_MS = 300;

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), DELAY_MS));
}

function filterFixtures(fixtures: Fixture[], filters?: FixtureFilters): Fixture[] {
  if (!filters) return fixtures;
  return fixtures.filter((f) => {
    if (filters.groupId && f.groupId !== filters.groupId) return false;
    if (filters.stage && f.stage !== filters.stage) return false;
    if (filters.state && f.state !== filters.state) return false;
    if (filters.teamId && f.homeTeamId !== filters.teamId && f.awayTeamId !== filters.teamId) return false;
    if (filters.date && !isSameDay(parseISO(f.kickoffAt), parseISO(filters.date))) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const home = MOCK_TEAMS.find((t) => t.id === f.homeTeamId);
      const away = MOCK_TEAMS.find((t) => t.id === f.awayTeamId);
      const haystack = `${home?.name} ${away?.name} ${f.name} ${f.groupId}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export async function getWorldCupFixtures(filters?: FixtureFilters): Promise<Fixture[]> {
  return delay(filterFixtures(ALL_FIXTURES, filters));
}

export async function getWorldCupGroups(): Promise<Group[]> {
  return delay(MOCK_GROUPS);
}

export async function getWorldCupTeams(): Promise<Team[]> {
  return delay(MOCK_TEAMS);
}

export async function getWorldCupStandings(groupId?: string): Promise<Standing[]> {
  const standings = computeStandings(ALL_FIXTURES.filter((f) => f.stage === "group" && f.state === "finished"));
  const filtered = groupId ? standings.filter((s) => s.groupId === groupId) : standings;
  return delay(filtered);
}

export async function getMatchById(id: number): Promise<Fixture | null> {
  return delay(getFixtureById(id) ?? null);
}

export async function getWorldCupBracket(): Promise<BracketData> {
  return delay(MOCK_BRACKET);
}

export async function getLeaderboard(scope: LeaderboardScope = "global", countryCode?: string): Promise<LeaderboardEntry[]> {
  let entries = [...MOCK_LEADERBOARD];
  if (scope === "friends") entries = entries.filter((e) => e.isFriend);
  if (scope === "country" && countryCode) entries = entries.filter((e) => e.countryCode === countryCode);
  return delay(entries);
}

// Predictions delegate to Zustand on client; server-side returns empty
export async function getPredictions(): Promise<Prediction[]> {
  return delay([]);
}

export async function savePrediction(_prediction: Prediction): Promise<void> {
  await delay(undefined);
}
