"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import toast from "react-hot-toast";
import CustomTextField from "@/app/(dashboard)/components/forms/theme-elements/CustomTextField";
import { useAuthContext } from "@/context/AuthContext/auth.context";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error: any) {
      if (error?.data?.error === "Invalid email or password") {
        toast.error("Invalid email or password");
      }
    }
  }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            variant="outlined"
            value={email}
            name='email'
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            value={password}
            name='password'
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  )
};

export default AuthLogin;
