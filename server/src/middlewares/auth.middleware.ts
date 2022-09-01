import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IExpressRequest } from 'src/types/expressRequest';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export type tokenUser = {
  id: number;
  username: string;
  email: string;
  iat: number;
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY) as tokenUser;
      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
