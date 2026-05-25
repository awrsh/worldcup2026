import { MatchStage, MatchStatus, PrismaClient } from '@prisma/client';
import { buildMatchSeeds, buildTeamSeeds } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.prediction.deleteMany();
  await prisma.leaderboardSnapshot.deleteMany();
  await prisma.match.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      externalUserId: 'local-dev-user',
      username: 'local-dev-user',
      displayName: 'Local Dev User',
    },
  });

  const teamSeeds = buildTeamSeeds();
  const codeToDbId = new Map<string, string>();

  for (const team of teamSeeds) {
    const created = await prisma.team.create({
      data: {
        legacyTeamId: team.legacyTeamId,
        name: team.name,
        countryCode: team.code,
        groupName: team.groupName,
        fifaRanking: team.fifaRanking,
      },
    });
    codeToDbId.set(team.code, created.id);
  }

  for (const match of buildMatchSeeds()) {
    const homeTeamId = codeToDbId.get(match.homeCode);
    const awayTeamId = codeToDbId.get(match.awayCode);
    if (!homeTeamId || !awayTeamId) continue;

    await prisma.match.create({
      data: {
        legacyFixtureId: match.legacyFixtureId,
        homeTeamId,
        awayTeamId,
        kickoffAt: new Date(match.kickoffAt),
        stage: MatchStage.GROUP,
        groupName: match.groupName,
        status: MatchStatus.UPCOMING,
      },
    });
  }

  console.log(`Seeded ${teamSeeds.length} teams and ${buildMatchSeeds().length} matches`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
