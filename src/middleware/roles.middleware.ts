import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    req.userRole = user.role;
    next();
  }
}
