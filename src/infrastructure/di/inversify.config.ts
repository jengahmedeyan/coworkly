import { Container } from 'inversify';
import { TYPES } from './types';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { SequelizeUserRepository } from '@infrastructure/repositories/implementations/SequelizeUserRepository';
import { UserController } from '@infrastructure/controllers/userController';
import { IPasswordHasher } from '@application/interfaces/IPasswordHasher';
import { BcryptPasswordHasher } from '@infrastructure/services/BcryptPasswordHasher';
import { JwtAuth } from '@infrastructure/auth/jwtStrategy';
import { GoogleAuth } from '@infrastructure/auth/googleStrategy';
import { IDocumentRepository } from '../../domain/repositories/IDocumentRepository';
import { SequelizeDocumentRepository } from '@infrastructure/repositories/implementations/SequelizeDocumentRepository';
import { SequelizeDocumentAccessRepository } from '@infrastructure/repositories/implementations/SequelizeDocumentAccessRepository';
import { IDocumentAccessRepository } from '@domain/repositories/IDocumentAccessRepository';
import { CollaborationService } from '@application/services/collaborationService';
import { UserService } from '@application/services/userService';
import { UserUseCase } from '@application/use_cases/userUseCase';

const container = new Container();

// Bind services and repositories
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(SequelizeUserRepository); 
container.bind<IPasswordHasher>(TYPES.IPasswordHasher).to(BcryptPasswordHasher);
container.bind<JwtAuth>(TYPES.JwtAuth).to(JwtAuth);
container.bind<GoogleAuth>(TYPES.GoogleAuth).to(GoogleAuth);
container.bind<IDocumentRepository>(TYPES.IDocumentRepository).to(SequelizeDocumentRepository);
container.bind<IDocumentAccessRepository>(TYPES.IDocumentAccessRepository).to(SequelizeDocumentAccessRepository);

// Bind controllers
container.bind<UserController>(TYPES.UserController).to(UserController);

// Bind use cases
container.bind<CollaborationService>(TYPES.CollaborationService).to(CollaborationService);
container.bind<UserUseCase>(TYPES.UserUseCase).to(UserUseCase);


export default container ;
