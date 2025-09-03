// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SEGREDO_SUPER_SECRETO', // Deve ser o mesmo segredo usado no JwtModule
    });
  }

  // O Passport vai chamar este método depois de validar o token com sucesso.
  // O que for retornado aqui será injetado no objeto `req.user` dos controllers.
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}