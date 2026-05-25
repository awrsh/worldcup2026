import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, Min } from 'class-validator';

export class UpsertWinnerPickDto {
  @ApiProperty({ example: 400021441 })
  @IsInt()
  @Min(1)
  fixtureId!: number;

  @ApiProperty({ enum: ['home', 'away', 'draw'] })
  @IsIn(['home', 'away', 'draw'])
  pick!: 'home' | 'away' | 'draw';
}
