import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ClientUserId } from '../../common/decorators/client-user-id.decorator';
import { UpsertWinnerPickDto } from './dto/upsert-winner-pick.dto';
import { PredictionsService } from './predictions.service';

@ApiTags('predictions')
@ApiSecurity('client-user')
@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post('winner-pick')
  upsertWinnerPick(@ClientUserId() clientUserId: string, @Body() dto: UpsertWinnerPickDto) {
    return this.predictionsService.upsertWinnerPick(clientUserId, dto);
  }

  @Get('me')
  listMine(@ClientUserId() clientUserId: string) {
    return this.predictionsService.listForClient(clientUserId);
  }
}
