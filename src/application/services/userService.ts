import { IUserRepository } from "@domain/repositories/IUserRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "@infrastructure/di/types";
import UserValidator from "@domain/validators/UserValidator";
import { IPasswordHasher } from "@application/interfaces/IPasswordHasher";
import UserEntity from "@domain/entities/userEntity";
import { CreateUserDTO, LoginUserDTO } from "@application/dto/userDTO";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IPasswordHasher) private passwordHasher: IPasswordHasher
  ) { }

  async registerUser(dto: CreateUserDTO): Promise<UserEntity> {
    UserValidator.validate(new UserEntity(dto.email, dto.password, dto.role));

    const hashedPassword = await this.passwordHasher.hash(dto.password);
    const user = new UserEntity(dto.email, hashedPassword, dto.role);

    return await this.userRepository.createUser(user);
  }

  async loginUser(dto: LoginUserDTO): Promise<UserEntity> {
    this.validateLoginInput(dto);

    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('User not found.');
    }

    await this.validatePassword(dto.password, user.password);
    return user;
  }

  private validateLoginInput(dto: LoginUserDTO) {
    if (!dto.email || !dto.password) {
      throw new Error('Email and password must be provided.');
    }
  }

  private async validatePassword(plainPassword: string, hashedPassword: string) {
    const isPasswordValid = await this.passwordHasher.compare(plainPassword, hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }
}
