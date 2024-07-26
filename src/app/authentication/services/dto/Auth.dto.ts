export interface AuthDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  exp: number;
}
