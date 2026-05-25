import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientUserMiddleware } from '../../common/middleware/client-user.middleware';
import { UsersModule } from '../users/users.module';
import { PredictionsController } from './predictions.controller';
import { PredictionsService } from './predictions.service';

@Module({
  imports: [UsersModule],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientUserMiddleware).forRoutes(PredictionsController);
  }
}
