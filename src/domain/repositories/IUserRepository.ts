import UserEntity from '@domain/entities/userEntity';

export interface IUserRepository {
  loginUser(email: string, password: string): Promise<UserEntity>;
  createUser(data: { email: string; password: string; role: string }): Promise<UserEntity>;
  updateUser(data: { email: string; password: string; role: string }): Promise<UserEntity>;
  deleteUser(id:string): Promise<void>;
  findByEmail(id: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
