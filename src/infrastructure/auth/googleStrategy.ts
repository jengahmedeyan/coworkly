import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/di/types';
import jwt from 'jsonwebtoken';
import logger from '@config/logger';
import { UserService } from '@application/services/userService';
import GenerateSecurePassword from '@infrastructure/utils/passwordGenerator';
import { CreateUserDTO } from '@infrastructure/dto/userRepositoryDTO';

@injectable()
export class GoogleAuth {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  initialize(): void {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            if (!email) {
              logger.error('No email found in Google profile');
              return done(null, false, { message: 'No email associated with Google account.' });
            }

            let user = await this.userService.findByEmail(email);

            if (!user) {
              const securePassword = GenerateSecurePassword(20);
              const newUserDto: CreateUserDTO = {
                email: email,
                password: securePassword,
                role: 'user' 
              };
              user = await this.userService.registerUser(newUserDto);
              logger.info(`Created new user: ${user.email}`);
            }
            
            const token = jwt.sign({ email: user.email, role: user.role, id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            return done(null, {user, token});
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
  }
}
