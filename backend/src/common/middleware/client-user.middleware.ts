import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CLIENT_USER_ID_HEADER } from '../decorators/client-user-id.decorator';

@Injectable()
export class ClientUserMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const header = req.headers[CLIENT_USER_ID_HEADER];
    const fromHeader = Array.isArray(header) ? header[0] : header;
    const clientUserId =
      fromHeader?.trim() ||
      process.env.DEFAULT_CLIENT_USER_ID ||
      'local-dev-user';

    (req as Request & { clientUserId: string }).clientUserId = clientUserId;
    next();
  }
}
