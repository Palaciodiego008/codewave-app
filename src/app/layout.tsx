"use client";

import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { baselightTheme } from "./ utils/theme/DefaultColors";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={baselightTheme}>
        <body>
          <CssBaseline />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
