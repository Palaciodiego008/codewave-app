import { authService } from "@/app/authentication/services/auth.service";
import { AuthDto, RegisterDto } from "@/app/authentication/services/dto/Auth.dto";
import { useRouter } from "next/router";
import { createContext } from "react";

interface AuthContextProps {
  login: (authParams: AuthDto) => Promise<any>
  register: (registerParams: RegisterDto) => Promise<any>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const login = async (authParams: AuthDto) => {
    const res = await authService.login(authParams)
    if (res.data.success) {
      window.localStorage.setItem("token", res.token)
      router.push("/")
    }

    return res
  }

  const register = async (registerParams: RegisterDto) => {
    const res = await authService.register(registerParams)
    if (res.data.success) {
      router.push("/authentication/login")
    }

    return res
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    router.push("/authentication/login")
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
