import type { Fixture, Standing } from "@/lib/api/types";
import { MOCK_TEAMS } from "@/data/mock/teams";

export function computeStandings(finishedFixtures: Fixture[]): Standing[] {
  const standingsMap = new Map<string, Standing>();

  for (const team of MOCK_TEAMS) {
    if (!team.groupId) continue;
    const key = `${team.groupId}-${team.id}`;
    standingsMap.set(key, {
      teamId: team.id,
      groupId: team.groupId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      position: 0,
    });
  }

  for (const fixture of finishedFixtures) {
    if (fixture.homeScore === undefined || fixture.awayScore === undefined || !fixture.groupId) continue;

    const homeKey = `${fixture.groupId}-${fixture.homeTeamId}`;
    const awayKey = `${fixture.groupId}-${fixture.awayTeamId}`;
    const home = standingsMap.get(homeKey);
    const away = standingsMap.get(awayKey);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += fixture.homeScore;
    home.goalsAgainst += fixture.awayScore;
    away.goalsFor += fixture.awayScore;
    away.goalsAgainst += fixture.homeScore;

    if (fixture.homeScore > fixture.awayScore) {
      home.won += 1;
      away.lost += 1;
      home.points += 3;
    } else if (fixture.homeScore < fixture.awayScore) {
      away.won += 1;
      home.lost += 1;
      away.points += 3;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  const result: Standing[] = [];
  const groupIds = [...new Set(MOCK_TEAMS.map((t) => t.groupId).filter(Boolean))] as string[];

  for (const groupId of groupIds) {
    const groupStandings = [...standingsMap.values()]
      .filter((s) => s.groupId === groupId)
      .map((s) => ({
        ...s,
        goalDifference: s.goalsFor - s.goalsAgainst,
      }))
      .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor);

    groupStandings.forEach((s, i) => {
      result.push({ ...s, position: i + 1 });
    });
  }

  return result;
}
