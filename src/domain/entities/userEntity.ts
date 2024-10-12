import { UserResponseDTO } from "@application/dto/UserResponseDTO";

class UserEntity {
  constructor(
    public email: string,
    public password: string,
    public role: string,
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

export default UserEntity;
