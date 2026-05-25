import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findOrCreateByClientId(clientUserId: string): Promise<User> {
    return this.prisma.user.upsert({
      where: { externalUserId: clientUserId },
      create: {
        externalUserId: clientUserId,
        username: clientUserId,
        displayName: clientUserId,
      },
      update: {},
    });
  }

  findByClientId(clientUserId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { externalUserId: clientUserId } });
  }
}
