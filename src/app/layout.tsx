"use client";

import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { baselightTheme } from "../ utils/theme/DefaultColors";
import { AuthProvider } from "../context/AuthContext/auth.context";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ThemeProvider theme={baselightTheme}>
          <body>
            <Toaster position='top-right'/>
            <CssBaseline />
            {children}
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
