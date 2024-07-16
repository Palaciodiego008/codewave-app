'use client';

import { authService } from "@/app/authentication/services/auth.service";
import { AuthDto, RegisterDto } from "@/app/authentication/services/dto/Auth.dto";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: any
  setUser: (user: any) => void
  login: (authParams: AuthDto) => Promise<any>
  register: (registerParams: RegisterDto) => Promise<any>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      setUser({
        name: 'John Doe',
        email: '',
      })

      router.push("/")
    } else {
      router.push("/authentication/login")
    }
  }, [])

  const login = async (authParams: AuthDto) => {
    const res = await authService.login(authParams)
    if (res.success) {
      setUser({
        name: 'John Doe',
        email: 'john@gmail.com'
      })

      window.localStorage.setItem("token", res.data.token)
      router.push("/")
    }

    return res
  }

  const register = async (registerParams: RegisterDto) => {
    const res = await authService.register(registerParams)
    if (res.success) {
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
        user,
        setUser,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }

  return authContext
}
