import { injectable } from 'inversify';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import UserEntity from '@domain/entities/userEntity';
import UserModel from '@infrastructure/database/models/UserModel';
import { CreateUserRepositoryDTO, UserDTO } from '@infrastructure/dto/userRepositoryDTO';

@injectable()
export class SequelizeUserRepository implements IUserRepository {

  async loginUser(email: string, password: string): Promise<UserEntity> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data: Omit<CreateUserRepositoryDTO,'id'>): Promise<UserEntity> {
    try{
      return await UserModel.create(data);
    }
    catch(error){
      const message= error instanceof Error ? error.message : 'An error occurred.';
      throw new Error(`Error creating user: ${message}`);
    }
  }

  async updateUser(data: { email: string; password: string; role: string }): Promise<UserEntity> {
    const user = await UserModel.findOne({ where: { email: data.email } });
    if (!user) {
      throw new Error('User not found');
    }
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;
    await user.save();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ where: { id } });
    return user;
  }

}
