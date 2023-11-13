"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from "@/server/request";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        username: data.get("username"),
        phoneNumber: data.get("phoneNumber"),
        password: data.get("password"),
      };

      await request.post("auth/register", userData);
      toast.success("You are registered !");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#ffc700", paddingBottom: "10px" }}>
            Vodiy Parfum
          </h2>

          <Typography component="h1" variant="h5">
            Ro`yxatdan o`tish
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Ismingiz"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Familiyangiz"
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Telefon raqamingiz"
              name="phoneNumber"
              autoComplete="phoneNumber"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parol"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Qayta kiriting"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              style={{ backgroundColor: "#ffc700", color: "#000" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ro`yxatdan o`tish
            </Button>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
              container
            >
              <Grid item>
                <Link style={{ color: "#000" }} href="/login" variant="body2">
                  {"Hisobingiz bormi? Kirish"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
