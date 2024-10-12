
import { PublicUserDTO, UserDTO } from "@application/dto/userDTO";
import UserEntity from "@domain/entities/userEntity";

export class UserMapper {

  public static toPublicDTO(user: UserDTO): PublicUserDTO {
    const { password, ...publicUser } = user;
    return publicUser;
  }
}
