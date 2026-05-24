export type Stage =
  | "group"
  | "round_of_32"
  | "round_of_16"
  | "quarter_final"
  | "semi_final"
  | "third_place"
  | "final";

export type MatchState = "not_started" | "live" | "finished";

export interface Team {
  id: number;
  name: string;
  shortCode: string;
  flagCode: string;
  groupId?: string;
  fifaRanking?: number;
  squad?: string[];
  countryCode?: string;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
  country: string;
  capacity?: number;
}

export interface Fixture {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  kickoffAt: string;
  venueId: number;
  stage: Stage;
  groupId?: string;
  roundName?: string;
  state: MatchState;
  homeScore?: number;
  awayScore?: number;
  placeholder?: boolean;
  name?: string;
}

export interface Group {
  id: string;
  name: string;
  teamIds: number[];
}

export interface Standing {
  teamId: number;
  groupId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
}

export type WinnerPick = "home" | "away" | "draw";

export interface Prediction {
  fixtureId: number;
  homeScore: number;
  awayScore: number;
  winnerPick?: WinnerPick;
  savedAt: string;
}

export interface User {
  id: string;
  username: string;
  avatarInitials: string;
  avatarUrl?: string | null;
  countryCode: string;
  totalPoints: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarInitials: string;
  countryCode: string;
  totalPoints: number;
  correctScores: number;
  correctWinners: number;
  streak: number;
  isFriend?: boolean;
}

export interface BracketEdge {
  id: number;
  parentFixtureId: number;
  childFixtureId: number;
  childSlot: "home" | "away";
  parentOutcome: "winner" | "loser";
}

export interface BracketStage {
  stage: Stage;
  name: string;
  fixtureIds: number[];
}

export interface BracketData {
  stages: BracketStage[];
  edges: BracketEdge[];
}

export interface FixtureFilters {
  groupId?: string;
  stage?: Stage;
  teamId?: number;
  date?: string;
  search?: string;
  state?: MatchState;
}

export type LeaderboardScope = "global" | "friends" | "country";

// Sportmonks-shaped DTOs for future backend proxy
export interface SportmonksParticipant {
  id: number;
  name: string;
  short_code: string;
  image_path?: string;
  placeholder: boolean;
  meta: { location: "home" | "away"; winner: boolean | null; position: number | null };
}

export interface SportmonksFixture {
  id: number;
  season_id: number;
  stage_id: number;
  group_id?: number;
  venue_id: number;
  name: string;
  starting_at: string;
  placeholder: boolean;
  state_id: number;
  participants: SportmonksParticipant[];
  scores?: Array<{ participant_id: number; score: { goals: number } }>;
}

export interface SportmonksBracketEdge {
  id: number;
  season_id: number;
  child_fixture_id: number;
  child_slot: "home" | "away";
  parent_fixture_id: number;
  parent_outcome: "winner" | "loser";
}

export const SPORTMONKS_SEASON_ID = 26618;
export const SPORTMONKS_LEAGUE_ID = 732;
