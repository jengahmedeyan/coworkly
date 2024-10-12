import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/di/types';
import { UserService } from '@application/services/userService';

interface JwtPayload {
  email: string;
}

@injectable()
export class JwtAuth {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  initialize(): void {
    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    };

    passport.use(
      new JwtStrategy(opts, async (jwtPayload: JwtPayload, done) => {
        try {
          const user = await this.userService.findByEmail(jwtPayload.email);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      })
    );
  }
}
