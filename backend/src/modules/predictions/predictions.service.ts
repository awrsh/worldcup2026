import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MatchStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { UsersService } from '../users/users.service';
import { UpsertWinnerPickDto } from './dto/upsert-winner-pick.dto';
import {
  matchWithTeamsInclude,
  PredictionResponseDto,
  toPredictionResponseDto,
} from './prediction.dto';

const PICK_SCORES: Record<UpsertWinnerPickDto['pick'], { home: number; away: number }> = {
  home: { home: 1, away: 0 },
  away: { home: 0, away: 1 },
  draw: { home: 1, away: 1 },
};

@Injectable()
export class PredictionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async upsertWinnerPick(
    clientUserId: string,
    dto: UpsertWinnerPickDto,
  ): Promise<PredictionResponseDto> {
    const user = await this.usersService.findOrCreateByClientId(clientUserId);

    const match = await this.prisma.match.findUnique({
      where: { legacyFixtureId: dto.fixtureId },
      include: matchWithTeamsInclude,
    });

    if (!match) {
      throw new NotFoundException(`Match not found for fixture id ${dto.fixtureId}`);
    }

    if (match.status !== MatchStatus.UPCOMING) {
      throw new BadRequestException('Predictions are locked for this match');
    }

    if (new Date() >= match.kickoffAt) {
      throw new BadRequestException('Predictions are locked after kickoff');
    }

    const scores = PICK_SCORES[dto.pick];

    const saved = await this.prisma.prediction.upsert({
      where: {
        userId_matchId: { userId: user.id, matchId: match.id },
      },
      create: {
        userId: user.id,
        matchId: match.id,
        predictedHomeScore: scores.home,
        predictedAwayScore: scores.away,
      },
      update: {
        predictedHomeScore: scores.home,
        predictedAwayScore: scores.away,
      },
    });

    return toPredictionResponseDto(saved, match);
  }

  async listForClient(clientUserId: string): Promise<PredictionResponseDto[]> {
    const user = await this.usersService.findByClientId(clientUserId);
    if (!user) return [];

    const rows = await this.prisma.prediction.findMany({
      where: { userId: user.id },
      include: {
        match: { include: matchWithTeamsInclude },
      },
      orderBy: { match: { kickoffAt: 'asc' } },
    });

    return rows.map((row) => toPredictionResponseDto(row, row.match));
  }
}
