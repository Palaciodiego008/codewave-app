"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext/auth.context";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    console.log('withAuth', props)

    const { user } = useAuthContext();
    useEffect(() => {
      if (!user) {
        redirect("/authentication/login");
      } else {
        redirect("/");
      }
    }, []); 

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
