import type { Team } from "@/lib/api/types";

export const GROUP_IDS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;

/** Official FIFA World Cup 2026 draw. flagCode = country-flag-icons ISO key. Rankings: FIFA Apr 2026. */
const GROUP_TEAMS: Record<
  string,
  Array<{ name: string; code: string; flagCode: string; ranking: number; cc: string }>
> = {
  A: [
    { name: "Mexico", code: "MEX", flagCode: "MX", ranking: 15, cc: "MX" },
    { name: "South Africa", code: "RSA", flagCode: "ZA", ranking: 60, cc: "ZA" },
    { name: "Korea Republic", code: "KOR", flagCode: "KR", ranking: 25, cc: "KR" },
    { name: "Czechia", code: "CZE", flagCode: "CZ", ranking: 41, cc: "CZ" },
  ],
  B: [
    { name: "Canada", code: "CAN", flagCode: "CA", ranking: 30, cc: "CA" },
    { name: "Bosnia and Herzegovina", code: "BIH", flagCode: "BA", ranking: 65, cc: "BA" },
    { name: "Qatar", code: "QAT", flagCode: "QA", ranking: 55, cc: "QA" },
    { name: "Switzerland", code: "SUI", flagCode: "CH", ranking: 19, cc: "CH" },
  ],
  C: [
    { name: "Brazil", code: "BRA", flagCode: "BR", ranking: 6, cc: "BR" },
    { name: "Morocco", code: "MAR", flagCode: "MA", ranking: 8, cc: "MA" },
    { name: "Haiti", code: "HAI", flagCode: "HT", ranking: 83, cc: "HT" },
    { name: "Scotland", code: "SCO", flagCode: "GB_SCT", ranking: 43, cc: "GB" },
  ],
  D: [
    { name: "United States", code: "USA", flagCode: "US", ranking: 16, cc: "US" },
    { name: "Paraguay", code: "PAR", flagCode: "PY", ranking: 40, cc: "PY" },
    { name: "Australia", code: "AUS", flagCode: "AU", ranking: 27, cc: "AU" },
    { name: "Türkiye", code: "TUR", flagCode: "TR", ranking: 22, cc: "TR" },
  ],
  E: [
    { name: "Germany", code: "GER", flagCode: "DE", ranking: 10, cc: "DE" },
    { name: "Curaçao", code: "CUW", flagCode: "CW", ranking: 82, cc: "CW" },
    { name: "Côte d'Ivoire", code: "CIV", flagCode: "CI", ranking: 34, cc: "CI" },
    { name: "Ecuador", code: "ECU", flagCode: "EC", ranking: 23, cc: "EC" },
  ],
  F: [
    { name: "Netherlands", code: "NED", flagCode: "NL", ranking: 7, cc: "NL" },
    { name: "Japan", code: "JPN", flagCode: "JP", ranking: 18, cc: "JP" },
    { name: "Sweden", code: "SWE", flagCode: "SE", ranking: 38, cc: "SE" },
    { name: "Tunisia", code: "TUN", flagCode: "TN", ranking: 44, cc: "TN" },
  ],
  G: [
    { name: "Belgium", code: "BEL", flagCode: "BE", ranking: 9, cc: "BE" },
    { name: "Egypt", code: "EGY", flagCode: "EG", ranking: 29, cc: "EG" },
    { name: "IR Iran", code: "IRN", flagCode: "IR", ranking: 21, cc: "IR" },
    { name: "New Zealand", code: "NZL", flagCode: "NZ", ranking: 85, cc: "NZ" },
  ],
  H: [
    { name: "Spain", code: "ESP", flagCode: "ES", ranking: 2, cc: "ES" },
    { name: "Cabo Verde", code: "CPV", flagCode: "CV", ranking: 69, cc: "CV" },
    { name: "Saudi Arabia", code: "KSA", flagCode: "SA", ranking: 61, cc: "SA" },
    { name: "Uruguay", code: "URU", flagCode: "UY", ranking: 17, cc: "UY" },
  ],
  I: [
    { name: "France", code: "FRA", flagCode: "FR", ranking: 1, cc: "FR" },
    { name: "Senegal", code: "SEN", flagCode: "SN", ranking: 14, cc: "SN" },
    { name: "Iraq", code: "IRQ", flagCode: "IQ", ranking: 57, cc: "IQ" },
    { name: "Norway", code: "NOR", flagCode: "NO", ranking: 31, cc: "NO" },
  ],
  J: [
    { name: "Argentina", code: "ARG", flagCode: "AR", ranking: 3, cc: "AR" },
    { name: "Algeria", code: "ALG", flagCode: "DZ", ranking: 28, cc: "DZ" },
    { name: "Austria", code: "AUT", flagCode: "AT", ranking: 24, cc: "AT" },
    { name: "Jordan", code: "JOR", flagCode: "JO", ranking: 63, cc: "JO" },
  ],
  K: [
    { name: "Portugal", code: "POR", flagCode: "PT", ranking: 5, cc: "PT" },
    { name: "Congo DR", code: "COD", flagCode: "CD", ranking: 46, cc: "CD" },
    { name: "Uzbekistan", code: "UZB", flagCode: "UZ", ranking: 50, cc: "UZ" },
    { name: "Colombia", code: "COL", flagCode: "CO", ranking: 13, cc: "CO" },
  ],
  L: [
    { name: "England", code: "ENG", flagCode: "GB_ENG", ranking: 4, cc: "GB" },
    { name: "Croatia", code: "CRO", flagCode: "HR", ranking: 11, cc: "HR" },
    { name: "Ghana", code: "GHA", flagCode: "GH", ranking: 74, cc: "GH" },
    { name: "Panama", code: "PAN", flagCode: "PA", ranking: 33, cc: "PA" },
  ],
};

const SQUAD_NAMES = [
  "Martinez", "Silva", "Johnson", "Garcia", "Smith", "Brown", "Wilson", "Taylor",
  "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Moore",
];

function generateSquad(seed: number): string[] {
  return Array.from({ length: 8 }, (_, i) => SQUAD_NAMES[(seed + i) % SQUAD_NAMES.length]);
}

let teamId = 0;
export const MOCK_TEAMS: Team[] = GROUP_IDS.flatMap((groupId) =>
  GROUP_TEAMS[groupId].map((t) => {
    teamId += 1;
    return {
      id: teamId,
      name: t.name,
      shortCode: t.code,
      flagCode: t.flagCode,
      groupId,
      fifaRanking: t.ranking,
      countryCode: t.cc,
      squad: generateSquad(teamId),
    };
  })
);

export function getTeamById(id: number): Team | undefined {
  return MOCK_TEAMS.find((t) => t.id === id);
}

export function getTeamByCode(code: string): Team | undefined {
  return MOCK_TEAMS.find((t) => t.shortCode === code);
}

export function getTeamsByGroup(groupId: string): Team[] {
  return MOCK_TEAMS.filter((t) => t.groupId === groupId);
}
