export interface AuthDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  exp: number;
}
