'use client';

import { useRouter } from "next/navigation";
import { AuthProvider, useAuthContext } from "./context/AuthContext/auth.context";
import { useEffect } from "react";
import Loader from "./(Dashboard)/layout/loader/Loader";

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
      <Loader />
    </AuthProvider>
  );
}

export default Home;
