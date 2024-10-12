import bcrypt from 'bcrypt';
import { IPasswordHasher } from '@application/interfaces/IPasswordHasher';
import { injectable } from 'inversify';

@injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}