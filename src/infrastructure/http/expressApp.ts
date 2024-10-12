import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import container from '@infrastructure/di/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { TYPES } from '@infrastructure/di/types';
import { JwtAuth } from '@infrastructure/auth/jwtStrategy';
import { GoogleAuth } from '@infrastructure/auth/googleStrategy';

const createExpressApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    standardHeaders: true,
    max: 100,
  });
  app.use(limiter);


const jwtAuth = container.get<JwtAuth>(TYPES.JwtAuth);
jwtAuth.initialize();

const googleAuth = container.get<GoogleAuth>(TYPES.GoogleAuth);
googleAuth.initialize();

  app.use(passport.initialize());

  const inversifyServer = new InversifyExpressServer(container);
  const appWithControllers = inversifyServer.build();
  
  app.use('/api', appWithControllers);

  return app;
};

export default createExpressApp;

