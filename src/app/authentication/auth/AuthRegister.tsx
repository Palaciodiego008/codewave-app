'use client';

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import toast from "react-hot-toast";
import CustomTextField from "@/app/(dashboard)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import { useAuthContext } from "@/context/AuthContext/auth.context";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const { register } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRegister = async () => {
    try {
      await register({ name, email, password });
      toast.success("Registration successful");
    } catch (error: any) {
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
