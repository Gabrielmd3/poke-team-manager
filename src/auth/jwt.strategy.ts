import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MINHA_CHAVE_SUPER_SECRETA_DO_POKEMON', // Na vida real, coloque isso no .env!
    });
  }

  async validate(payload: any) {
    // O que retornarmos aqui será injetado no Request (req.user)
    return { userId: payload.sub, email: payload.email };
  }
}