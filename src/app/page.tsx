'use client';

import { useRouter } from "next/navigation";
import { AuthProvider, useAuthContext } from "./context/AuthContext/auth.context";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/authentication/login")
    } else {
      router.push("/")
    }
  }, [])


  return (
    <AuthProvider>
      <h1>Home</h1>
    </AuthProvider>
  );
}

export default Home;
