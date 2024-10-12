import { CreateUserDTO, LoginUserDTO } from "@application/dto/userDTO";
import { UserService } from "@application/services/userService";
import UserEntity from "@domain/entities/userEntity";
import { TYPES } from "@infrastructure/di/types";
import { inject, injectable } from "inversify";

@injectable()
export class UserUseCase {
    constructor(
        @inject(TYPES.UserService) private userService: UserService
    ) {}

    async register(dto: CreateUserDTO): Promise<UserEntity> {
        return await this.userService.registerUser(dto);
    }

    async login(dto: LoginUserDTO): Promise<UserEntity> {
        return await this.userService.loginUser(dto);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userService.findByEmail(email);
    }

    async findById(id: string): Promise<UserEntity | null> {
        return await this.userService.findById(id);
    }
}
