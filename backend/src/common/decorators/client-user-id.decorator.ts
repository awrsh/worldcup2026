import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CLIENT_USER_ID_HEADER = 'x-client-user-id';

export const ClientUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ clientUserId: string }>();
    return request.clientUserId;
  },
);
