import { AUTH_ROUTES } from "@/config/api";
import { ApiGateway } from "@/config/apiGateway";
import { AuthDto, RegisterDto } from "./dto/Auth.dto";

class AuthService {
  async login(authParams: AuthDto): Promise<any> {
    try {
      const { data } = await ApiGateway.post(AUTH_ROUTES.LOGIN, { ...authParams })

      return data;
    } catch (error) {
      return error;
    }
  }

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const response = await ApiGateway.post(AUTH_ROUTES.REGISTER, { ...registerDto })

      return response.data;
    } catch (error) {
      const err = String(error);
      throw new Error(err);
    }
  }
}

export const authService = new AuthService();
