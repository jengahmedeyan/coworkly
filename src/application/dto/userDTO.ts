// DTO for internal use (e.g., repository)
export interface UserDTO {
  id: string;  
  email: string;
  password: string;
  role: string;
  createdAt?: Date | undefined;
  updatedAt: Date   | undefined;
}

export type LoginUserDTO = Pick<UserDTO, 'email' | 'password'>;
export type CreateUserDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserDTO = Partial<Omit<UserDTO, 'id'>>;
export type CreateUserRepositoryDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserRepositoryDTO = Partial<Omit<UserDTO, 'id'>>;
export type PublicUserDTO = Omit<UserDTO, 'password'>;
