export type TeamSeed = {
  legacyTeamId: number;
  name: string;
  code: string;
  groupName: string;
  fifaRanking: number;
};

export type MatchSeedRow = {
  legacyFixtureId: number;
  groupName: string;
  homeCode: string;
  awayCode: string;
  kickoffAt: string;
};

const GROUP_TEAMS: Record<string, Array<{ name: string; code: string; ranking: number }>> = {
  A: [
    { name: 'Mexico', code: 'MEX', ranking: 15 },
    { name: 'South Africa', code: 'RSA', ranking: 60 },
    { name: 'Korea Republic', code: 'KOR', ranking: 25 },
    { name: 'Czechia', code: 'CZE', ranking: 41 },
  ],
  B: [
    { name: 'Canada', code: 'CAN', ranking: 30 },
    { name: 'Bosnia and Herzegovina', code: 'BIH', ranking: 65 },
    { name: 'Qatar', code: 'QAT', ranking: 55 },
    { name: 'Switzerland', code: 'SUI', ranking: 19 },
  ],
  C: [
    { name: 'Brazil', code: 'BRA', ranking: 6 },
    { name: 'Morocco', code: 'MAR', ranking: 8 },
    { name: 'Haiti', code: 'HAI', ranking: 83 },
    { name: 'Scotland', code: 'SCO', ranking: 43 },
  ],
  D: [
    { name: 'United States', code: 'USA', ranking: 16 },
    { name: 'Paraguay', code: 'PAR', ranking: 40 },
    { name: 'Australia', code: 'AUS', ranking: 27 },
    { name: 'Türkiye', code: 'TUR', ranking: 22 },
  ],
  E: [
    { name: 'Germany', code: 'GER', ranking: 10 },
    { name: 'Curaçao', code: 'CUW', ranking: 82 },
    { name: "Côte d'Ivoire", code: 'CIV', ranking: 34 },
    { name: 'Ecuador', code: 'ECU', ranking: 23 },
  ],
  F: [
    { name: 'Netherlands', code: 'NED', ranking: 7 },
    { name: 'Japan', code: 'JPN', ranking: 18 },
    { name: 'Sweden', code: 'SWE', ranking: 38 },
    { name: 'Tunisia', code: 'TUN', ranking: 44 },
  ],
  G: [
    { name: 'Belgium', code: 'BEL', ranking: 9 },
    { name: 'Egypt', code: 'EGY', ranking: 29 },
    { name: 'IR Iran', code: 'IRN', ranking: 21 },
    { name: 'New Zealand', code: 'NZL', ranking: 85 },
  ],
  H: [
    { name: 'Spain', code: 'ESP', ranking: 2 },
    { name: 'Cabo Verde', code: 'CPV', ranking: 69 },
    { name: 'Saudi Arabia', code: 'KSA', ranking: 61 },
    { name: 'Uruguay', code: 'URU', ranking: 17 },
  ],
  I: [
    { name: 'France', code: 'FRA', ranking: 1 },
    { name: 'Senegal', code: 'SEN', ranking: 14 },
    { name: 'Iraq', code: 'IRQ', ranking: 57 },
    { name: 'Norway', code: 'NOR', ranking: 31 },
  ],
  J: [
    { name: 'Argentina', code: 'ARG', ranking: 3 },
    { name: 'Algeria', code: 'ALG', ranking: 28 },
    { name: 'Austria', code: 'AUT', ranking: 24 },
    { name: 'Jordan', code: 'JOR', ranking: 63 },
  ],
  K: [
    { name: 'Portugal', code: 'POR', ranking: 5 },
    { name: 'Congo DR', code: 'COD', ranking: 46 },
    { name: 'Uzbekistan', code: 'UZB', ranking: 50 },
    { name: 'Colombia', code: 'COL', ranking: 13 },
  ],
  L: [
    { name: 'England', code: 'ENG', ranking: 4 },
    { name: 'Croatia', code: 'CRO', ranking: 11 },
    { name: 'Ghana', code: 'GHA', ranking: 74 },
    { name: 'Panama', code: 'PAN', ranking: 33 },
  ],
};

const GROUP_MATCHES: Array<[string, string, string, string, number, number?, number?]> = [
  ['A', 'MEX', 'RSA', '2026-06-11', 15],
  ['A', 'KOR', 'CZE', '2026-06-11', 22],
  ['A', 'CZE', 'RSA', '2026-06-18', 12],
  ['A', 'MEX', 'KOR', '2026-06-18', 21],
  ['A', 'CZE', 'MEX', '2026-06-24', 21],
  ['A', 'RSA', 'KOR', '2026-06-24', 21],
  ['B', 'CAN', 'BIH', '2026-06-12', 15],
  ['B', 'QAT', 'SUI', '2026-06-13', 15],
  ['B', 'BIH', 'SUI', '2026-06-18', 15],
  ['B', 'CAN', 'QAT', '2026-06-18', 18],
  ['B', 'SUI', 'CAN', '2026-06-24', 15],
  ['B', 'BIH', 'QAT', '2026-06-24', 15],
  ['C', 'BRA', 'MAR', '2026-06-13', 18],
  ['C', 'HAI', 'SCO', '2026-06-13', 21],
  ['C', 'SCO', 'MAR', '2026-06-19', 18],
  ['C', 'BRA', 'HAI', '2026-06-19', 21],
  ['C', 'SCO', 'BRA', '2026-06-24', 18],
  ['C', 'MAR', 'HAI', '2026-06-24', 18],
  ['D', 'USA', 'PAR', '2026-06-12', 21],
  ['D', 'AUS', 'TUR', '2026-06-13', 0],
  ['D', 'TUR', 'PAR', '2026-06-20', 0],
  ['D', 'USA', 'AUS', '2026-06-19', 15],
  ['D', 'TUR', 'USA', '2026-06-25', 22],
  ['D', 'PAR', 'AUS', '2026-06-25', 22],
  ['E', 'GER', 'CUW', '2026-06-14', 13],
  ['E', 'CIV', 'ECU', '2026-06-14', 19],
  ['E', 'GER', 'CIV', '2026-06-20', 16],
  ['E', 'ECU', 'CUW', '2026-06-20', 20],
  ['E', 'ECU', 'GER', '2026-06-25', 16],
  ['E', 'CUW', 'CIV', '2026-06-25', 16],
  ['F', 'NED', 'JPN', '2026-06-14', 16],
  ['F', 'SWE', 'TUN', '2026-06-14', 22],
  ['F', 'TUN', 'JPN', '2026-06-20', 13],
  ['F', 'NED', 'SWE', '2026-06-20', 0],
  ['F', 'TUN', 'NED', '2026-06-25', 19],
  ['F', 'JPN', 'SWE', '2026-06-25', 19],
  ['G', 'BEL', 'EGY', '2026-06-15', 15],
  ['G', 'IRN', 'NZL', '2026-06-15', 21],
  ['G', 'BEL', 'IRN', '2026-06-21', 15],
  ['G', 'NZL', 'EGY', '2026-06-21', 21],
  ['G', 'NZL', 'BEL', '2026-06-26', 20],
  ['G', 'EGY', 'IRN', '2026-06-26', 20],
  ['H', 'ESP', 'CPV', '2026-06-15', 12],
  ['H', 'KSA', 'URU', '2026-06-15', 18],
  ['H', 'ESP', 'KSA', '2026-06-21', 12],
  ['H', 'URU', 'CPV', '2026-06-21', 18],
  ['H', 'CPV', 'KSA', '2026-06-26', 20],
  ['H', 'URU', 'ESP', '2026-06-26', 20],
  ['I', 'FRA', 'SEN', '2026-06-16', 15],
  ['I', 'IRQ', 'NOR', '2026-06-16', 18],
  ['I', 'FRA', 'IRQ', '2026-06-22', 17],
  ['I', 'NOR', 'SEN', '2026-06-22', 20],
  ['I', 'NOR', 'FRA', '2026-06-26', 15],
  ['I', 'SEN', 'IRQ', '2026-06-26', 15],
  ['J', 'ARG', 'ALG', '2026-06-16', 21],
  ['J', 'AUT', 'JOR', '2026-06-17', 0],
  ['J', 'ARG', 'AUT', '2026-06-22', 13],
  ['J', 'JOR', 'ALG', '2026-06-22', 23],
  ['J', 'JOR', 'ARG', '2026-06-27', 22],
  ['J', 'ALG', 'AUT', '2026-06-27', 22],
  ['K', 'POR', 'COD', '2026-06-17', 13],
  ['K', 'UZB', 'COL', '2026-06-17', 22],
  ['K', 'POR', 'UZB', '2026-06-23', 13],
  ['K', 'COL', 'COD', '2026-06-23', 22],
  ['K', 'COL', 'POR', '2026-06-27', 19],
  ['K', 'COD', 'UZB', '2026-06-27', 19],
  ['L', 'ENG', 'CRO', '2026-06-17', 16],
  ['L', 'GHA', 'PAN', '2026-06-17', 19],
  ['L', 'ENG', 'GHA', '2026-06-23', 16],
  ['L', 'PAN', 'CRO', '2026-06-23', 19],
  ['L', 'PAN', 'ENG', '2026-06-27', 17],
  ['L', 'CRO', 'GHA', '2026-06-27', 17],
];

function etToUtc(date: string, hour: number, minute = 0): string {
  const [y, m, d] = date.split('-').map(Number);
  let utcH = hour + 4;
  let day = d;
  if (utcH >= 24) {
    utcH -= 24;
    day += 1;
  }
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(utcH).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`;
}

export function buildTeamSeeds(): TeamSeed[] {
  let legacyTeamId = 0;
  const teams: TeamSeed[] = [];

  for (const groupName of Object.keys(GROUP_TEAMS)) {
    for (const t of GROUP_TEAMS[groupName]) {
      legacyTeamId += 1;
      teams.push({
        legacyTeamId,
        name: t.name,
        code: t.code,
        groupName,
        fifaRanking: t.ranking,
      });
    }
  }

  return teams;
}

export function buildMatchSeeds(): MatchSeedRow[] {
  let legacyFixtureId = 400021440;
  const matches: MatchSeedRow[] = [];

  for (const [groupName, homeCode, awayCode, date, hour, minute] of GROUP_MATCHES) {
    legacyFixtureId += 1;
    matches.push({
      legacyFixtureId,
      groupName,
      homeCode,
      awayCode,
      kickoffAt: etToUtc(date, hour, minute ?? 0),
    });
  }

  return matches;
}
