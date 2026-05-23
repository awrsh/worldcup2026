import type { Fixture } from "@/lib/api/types";
import { getTeamByCode } from "./teams";

/** Convert Eastern Daylight Time (UTC-4 in June) to ISO UTC string. */
function etToUtc(date: string, hour: number, minute = 0): string {
  const [y, m, d] = date.split("-").map(Number);
  let utcH = hour + 4;
  let day = d;
  if (utcH >= 24) {
    utcH -= 24;
    day += 1;
  }
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(utcH).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`;
}

type MatchSeed = [group: string, home: string, away: string, date: string, hourEt: number, venueId: number, minute?: number];

/** Official FIFA World Cup 2026 group-stage schedule (venues + kickoff times ET, Dec 2025 release). */
const GROUP_MATCHES: MatchSeed[] = [
  // Group A
  ["A", "MEX", "RSA", "2026-06-11", 15, 9],
  ["A", "KOR", "CZE", "2026-06-11", 22, 11],
  ["A", "CZE", "RSA", "2026-06-18", 12, 4],
  ["A", "MEX", "KOR", "2026-06-18", 21, 11],
  ["A", "CZE", "MEX", "2026-06-24", 21, 9],
  ["A", "RSA", "KOR", "2026-06-24", 21, 10],
  // Group B
  ["B", "CAN", "BIH", "2026-06-12", 15, 13],
  ["B", "QAT", "SUI", "2026-06-13", 15, 7],
  ["B", "BIH", "SUI", "2026-06-18", 15, 2],
  ["B", "CAN", "QAT", "2026-06-18", 18, 12],
  ["B", "SUI", "CAN", "2026-06-24", 15, 12],
  ["B", "BIH", "QAT", "2026-06-24", 15, 8],
  // Group C
  ["C", "BRA", "MAR", "2026-06-13", 18, 1],
  ["C", "HAI", "SCO", "2026-06-13", 21, 16],
  ["C", "SCO", "MAR", "2026-06-19", 18, 6],
  ["C", "BRA", "HAI", "2026-06-19", 21, 16],
  ["C", "SCO", "BRA", "2026-06-24", 18, 5],
  ["C", "MAR", "HAI", "2026-06-24", 18, 4],
  // Group D
  ["D", "USA", "PAR", "2026-06-12", 21, 2],
  ["D", "AUS", "TUR", "2026-06-13", 0, 12],
  ["D", "TUR", "PAR", "2026-06-20", 0, 7],
  ["D", "USA", "AUS", "2026-06-19", 15, 8],
  ["D", "TUR", "USA", "2026-06-25", 22, 2],
  ["D", "PAR", "AUS", "2026-06-25", 22, 7],
  // Group E
  ["E", "GER", "CUW", "2026-06-14", 13, 14],
  ["E", "CIV", "ECU", "2026-06-14", 19, 6],
  ["E", "GER", "CIV", "2026-06-20", 16, 13],
  ["E", "ECU", "CUW", "2026-06-20", 20, 15],
  ["E", "ECU", "GER", "2026-06-25", 16, 1],
  ["E", "CUW", "CIV", "2026-06-25", 16, 6],
  // Group F
  ["F", "NED", "JPN", "2026-06-14", 16, 3],
  ["F", "SWE", "TUN", "2026-06-14", 22, 10],
  ["F", "TUN", "JPN", "2026-06-20", 13, 10],
  ["F", "NED", "SWE", "2026-06-20", 0, 14],
  ["F", "TUN", "NED", "2026-06-25", 19, 3],
  ["F", "JPN", "SWE", "2026-06-25", 19, 15],
  // Group G
  ["G", "BEL", "EGY", "2026-06-15", 15, 2],
  ["G", "IRN", "NZL", "2026-06-15", 21, 8],
  ["G", "BEL", "IRN", "2026-06-21", 15, 2],
  ["G", "NZL", "EGY", "2026-06-21", 21, 12],
  ["G", "NZL", "BEL", "2026-06-26", 20, 8],
  ["G", "EGY", "IRN", "2026-06-26", 20, 12],
  // Group H
  ["H", "ESP", "CPV", "2026-06-15", 12, 4],
  ["H", "KSA", "URU", "2026-06-15", 18, 5],
  ["H", "ESP", "KSA", "2026-06-21", 12, 4],
  ["H", "URU", "CPV", "2026-06-21", 18, 5],
  ["H", "CPV", "KSA", "2026-06-26", 20, 14],
  ["H", "URU", "ESP", "2026-06-26", 20, 11],
  // Group I
  ["I", "FRA", "SEN", "2026-06-16", 15, 1],
  ["I", "IRQ", "NOR", "2026-06-16", 18, 16],
  ["I", "FRA", "IRQ", "2026-06-22", 17, 6],
  ["I", "NOR", "SEN", "2026-06-22", 20, 1],
  ["I", "NOR", "FRA", "2026-06-26", 15, 16],
  ["I", "SEN", "IRQ", "2026-06-26", 15, 13],
  // Group J
  ["J", "ARG", "ALG", "2026-06-16", 21, 15],
  ["J", "AUT", "JOR", "2026-06-17", 0, 7],
  ["J", "ARG", "AUT", "2026-06-22", 13, 3],
  ["J", "JOR", "ALG", "2026-06-22", 23, 7],
  ["J", "JOR", "ARG", "2026-06-27", 22, 15],
  ["J", "ALG", "AUT", "2026-06-27", 22, 3],
  // Group K
  ["K", "POR", "COD", "2026-06-17", 13, 14],
  ["K", "UZB", "COL", "2026-06-17", 22, 9],
  ["K", "POR", "UZB", "2026-06-23", 13, 14],
  ["K", "COL", "COD", "2026-06-23", 22, 11],
  ["K", "COL", "POR", "2026-06-27", 19, 5, 30],
  ["K", "COD", "UZB", "2026-06-27", 19, 4, 30],
  // Group L
  ["L", "ENG", "CRO", "2026-06-17", 16, 3],
  ["L", "GHA", "PAN", "2026-06-17", 19, 13],
  ["L", "ENG", "GHA", "2026-06-23", 16, 16],
  ["L", "PAN", "CRO", "2026-06-23", 19, 13],
  ["L", "PAN", "ENG", "2026-06-27", 17, 1],
  ["L", "CRO", "GHA", "2026-06-27", 17, 6],
];

let fixtureId = 400021440;

function buildGroupFixtures(): Fixture[] {
  const matchdayCount: Record<string, number> = {};

  return GROUP_MATCHES.map(([groupId, homeCode, awayCode, date, hourEt, venueId, minute]) => {
    const home = getTeamByCode(homeCode)!;
    const away = getTeamByCode(awayCode)!;
    matchdayCount[groupId] = (matchdayCount[groupId] ?? 0) + 1;
    const md = Math.ceil(matchdayCount[groupId] / 2);
    fixtureId += 1;

    return {
      id: fixtureId,
      homeTeamId: home.id,
      awayTeamId: away.id,
      kickoffAt: etToUtc(date, hourEt, minute ?? 0),
      venueId,
      stage: "group" as const,
      groupId,
      roundName: `Matchday ${md}`,
      state: "not_started" as const,
      name: `${home.name} vs ${away.name}`,
    };
  });
}

export const MOCK_FIXTURES: Fixture[] = buildGroupFixtures();

const KNOCKOUT_FIXTURES: Fixture[] = [
  { id: 400021518, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-06-28T23:00:00Z", venueId: 2, stage: "round_of_32", roundName: "Round of 32", state: "not_started", placeholder: true, name: "Group A runners-up vs Group B runners-up" },
  { id: 400021513, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-06-29T23:00:00Z", venueId: 16, stage: "round_of_32", roundName: "Round of 32", state: "not_started", placeholder: true, name: "Group E winners vs third place" },
  { id: 400021516, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-06-30T23:00:00Z", venueId: 14, stage: "round_of_32", roundName: "Round of 32", state: "not_started", placeholder: true, name: "Group C winners vs Group F runners-up" },
  { id: 400021530, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-07-04T23:00:00Z", venueId: 14, stage: "round_of_16", roundName: "Round of 16", state: "not_started", placeholder: true, name: "Winner R32 vs Winner R32" },
  { id: 400021536, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-07-09T23:00:00Z", venueId: 16, stage: "quarter_final", roundName: "Quarter Final", state: "not_started", placeholder: true, name: "Winner R16 vs Winner R16" },
  { id: 400021541, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-07-14T23:00:00Z", venueId: 3, stage: "semi_final", roundName: "Semi Final", state: "not_started", placeholder: true, name: "Winner QF vs Winner QF" },
  { id: 400021542, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-07-18T23:00:00Z", venueId: 5, stage: "third_place", roundName: "Third Place", state: "not_started", placeholder: true, name: "Loser SF vs Loser SF" },
  { id: 400021543, homeTeamId: 0, awayTeamId: 0, kickoffAt: "2026-07-19T23:00:00Z", venueId: 1, stage: "final", roundName: "Final", state: "not_started", placeholder: true, name: "Winner SF vs Winner SF" },
];

export const ALL_FIXTURES: Fixture[] = [...MOCK_FIXTURES, ...KNOCKOUT_FIXTURES];

export function getFixtureById(id: number): Fixture | undefined {
  return ALL_FIXTURES.find((f) => f.id === id);
}

export function getNextUpcomingFixture(): Fixture | undefined {
  const now = new Date();
  return ALL_FIXTURES.filter((f) => f.state === "not_started" && !f.placeholder && new Date(f.kickoffAt) > now)
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())[0];
}
