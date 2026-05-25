import { MatchStage, MatchStatus, PrismaClient } from '@prisma/client';
import {
  buildMatchSeeds,
  buildTeamSeeds,
  type MatchSeedRow,
  type TeamSeed,
} from './seed-data';

const prisma = new PrismaClient();

function shouldResetBeforeSeed(): boolean {
  return process.env.SEED_RESET === 'true' || process.env.NODE_ENV !== 'production';
}

async function resetDevData(): Promise<void> {
  await prisma.$transaction([
    prisma.prediction.deleteMany(),
    prisma.leaderboardSnapshot.deleteMany(),
    prisma.match.deleteMany(),
    prisma.team.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

async function seedTeams(teamSeeds: TeamSeed[]): Promise<Map<string, string>> {
  const codeToDbId = new Map<string, string>();

  for (const team of teamSeeds) {
    const row = await prisma.team.upsert({
      where: { countryCode: team.code },
      create: {
        legacyTeamId: team.legacyTeamId,
        name: team.name,
        countryCode: team.code,
        groupName: team.groupName,
        fifaRanking: team.fifaRanking,
      },
      update: {
        legacyTeamId: team.legacyTeamId,
        name: team.name,
        groupName: team.groupName,
        fifaRanking: team.fifaRanking,
      },
    });
    codeToDbId.set(team.code, row.id);
  }

  return codeToDbId;
}

async function seedMatches(
  matchSeeds: MatchSeedRow[],
  codeToDbId: Map<string, string>,
): Promise<number> {
  let matchCount = 0;

  for (const match of matchSeeds) {
    const homeTeamId = codeToDbId.get(match.homeCode);
    const awayTeamId = codeToDbId.get(match.awayCode);

    if (!homeTeamId || !awayTeamId) {
      console.warn(
        `Skipped fixture ${match.legacyFixtureId}: missing team (${match.homeCode} vs ${match.awayCode})`,
      );
      continue;
    }

    await prisma.match.upsert({
      where: { legacyFixtureId: match.legacyFixtureId },
      create: {
        legacyFixtureId: match.legacyFixtureId,
        homeTeamId,
        awayTeamId,
        kickoffAt: new Date(match.kickoffAt),
        stage: MatchStage.GROUP,
        groupName: match.groupName,
        status: MatchStatus.UPCOMING,
      },
      update: {
        homeTeamId,
        awayTeamId,
        kickoffAt: new Date(match.kickoffAt),
        groupName: match.groupName,
      },
    });
    matchCount += 1;
  }

  return matchCount;
}

async function main(): Promise<void> {
  const teamSeeds = buildTeamSeeds();
  const matchSeeds = buildMatchSeeds();

  if (shouldResetBeforeSeed()) {
    await resetDevData();
  }

  await prisma.user.upsert({
    where: { externalUserId: 'local-dev-user' },
    create: {
      externalUserId: 'local-dev-user',
      username: 'local-dev-user',
      displayName: 'Local Dev User',
    },
    update: {
      displayName: 'Local Dev User',
    },
  });

  const codeToDbId = await seedTeams(teamSeeds);
  const matchCount = await seedMatches(matchSeeds, codeToDbId);

  console.log(`Seeded ${teamSeeds.length} teams and ${matchCount} matches`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
