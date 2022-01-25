export interface CreateUserDto {
  name: string;
  login: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  login?: string;
  password?: string;
}
