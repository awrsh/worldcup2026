import { Match, Prediction, Team } from '@prisma/client';

export type MatchWithTeams = Match & {
  homeTeam: Pick<Team, 'name' | 'countryCode'>;
  awayTeam: Pick<Team, 'name' | 'countryCode'>;
};

export type PredictionResponseDto = {
  fixtureId: number;
  matchName: string;
  groupName: string | null;
  kickoffAt: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  savedAt: string;
};

export function buildMatchName(match: MatchWithTeams): string {
  return `${match.homeTeam.name} vs ${match.awayTeam.name}`;
}

export function toPredictionResponseDto(
  row: Prediction,
  match: MatchWithTeams,
): PredictionResponseDto {
  return {
    fixtureId: match.legacyFixtureId,
    matchName: buildMatchName(match),
    groupName: match.groupName,
    kickoffAt: match.kickoffAt.toISOString(),
    predictedHomeScore: row.predictedHomeScore,
    predictedAwayScore: row.predictedAwayScore,
    savedAt: row.updatedAt.toISOString(),
  };
}

export const matchWithTeamsInclude = {
  homeTeam: { select: { name: true, countryCode: true } },
  awayTeam: { select: { name: true, countryCode: true } },
} as const;
