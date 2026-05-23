import type {
  SportmonksFixture,
  SportmonksParticipant,
  Team,
  Fixture,
  Venue,
  Standing,
  BracketData,
} from "./types";

const STATE_MAP: Record<number, Fixture["state"]> = {
  1: "not_started",
  2: "live",
  5: "finished",
};

export function mapSportmonksFixture(dto: SportmonksFixture, teams: Team[]): Fixture {
  const home = dto.participants.find((p) => p.meta.location === "home");
  const away = dto.participants.find((p) => p.meta.location === "away");
  const homeTeam = teams.find((t) => t.name === home?.name || t.shortCode === home?.short_code);
  const awayTeam = teams.find((t) => t.name === away?.name || t.shortCode === away?.short_code);

  let homeScore: number | undefined;
  let awayScore: number | undefined;
  if (dto.scores?.length) {
    homeScore = dto.scores.find((s) => s.participant_id === home?.id)?.score.goals;
    awayScore = dto.scores.find((s) => s.participant_id === away?.id)?.score.goals;
  }

  return {
    id: dto.id,
    homeTeamId: homeTeam?.id ?? 0,
    awayTeamId: awayTeam?.id ?? 0,
    kickoffAt: dto.starting_at,
    venueId: dto.venue_id,
    stage: "group",
    state: STATE_MAP[dto.state_id] ?? "not_started",
    homeScore,
    awayScore,
    placeholder: dto.placeholder,
    name: dto.name,
  };
}

export function mapSportmonksTeam(dto: SportmonksParticipant): Partial<Team> {
  return {
    name: dto.name,
    shortCode: dto.short_code,
  };
}

// Placeholder mappers for future backend integration
export function mapSportmonksStandings(_data: unknown): Standing[] {
  return [];
}

export function mapSportmonksBracket(_data: unknown): BracketData {
  return { stages: [], edges: [] };
}

export function mapSportmonksVenue(_data: unknown): Venue | null {
  return null;
}
