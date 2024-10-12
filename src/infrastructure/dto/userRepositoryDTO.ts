export interface UserDTO {
  id: string;  
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserDTO = Partial<Omit<UserDTO, 'id'>>;
export type CreateUserRepositoryDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserRepositoryDTO = Partial<Omit<UserDTO, 'id'>>;
