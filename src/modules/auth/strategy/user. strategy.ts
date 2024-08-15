import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }
  async validate(payload: {
    id: number;
    email: string;
    iat: number;
    exp: number;
  }) {
    console.log({ payload });

    const user = this.authService.verifyUser(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
