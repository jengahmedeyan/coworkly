import { inject } from 'inversify';
import { Request, Response } from 'express';
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { TYPES } from '@infrastructure/di/types';
import passport from 'passport';
import { UserUseCase } from '@application/use_cases/userUseCase';
import { CreateUserDTO, LoginUserDTO } from '@application/dto/userDTO';

@controller('/auth')
export class UserController {
  constructor(
    @inject(TYPES.UserUseCase) private userUseCase: UserUseCase
  ) {}

  @httpPost('/register')
  public async registerUser(
    @requestBody() body: CreateUserDTO,
    @response() res: Response
  ): Promise<void> {
    try {
      const user = await this.userUseCase.register(body);
      const sanitizedUser = this.sanitizeUser(user);
      res.status(201).json(sanitizedUser);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  @httpPost('/login')
  public async loginUser(
    @requestBody() body: LoginUserDTO,
    @response() res: Response
  ): Promise<void> {
    try {
      const user = await this.userUseCase.login(body);
      res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  @httpGet('/email', passport.authenticate('jwt', { session: false }))
  public async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query;
      const user = await this.userUseCase.findByEmail(email as string);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  @httpGet('/user/:id')
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userUseCase.findById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  @httpGet('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  public googleAuth(req: Request, res: Response): void {
    res.redirect('/');
  }

  @httpGet('/google/callback', passport.authenticate('google', { session: false }))
  public async googleAuthRedirect(req: Request, res: Response): Promise<void> {
    const { user, token } = req.user as { user: any; token: string };
    res.redirect(`http://localhost:3000?token=${token}`);
  }

  private handleError(error: unknown, res: Response): void {
    res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred.' });
  }

  private sanitizeUser(user: any): any {
    if (!user) return null;
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
