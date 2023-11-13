"use client"

import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from "@/server/request";
import Cookies from "js-cookie";

import useAuth from "@/store/auth";
import { USER_DATA, USER_TOKEN } from "@/constants";
import { useRouter } from 'next/navigation'



const defaultTheme = createTheme();

export default function LoginForm() {
  const {setIsAuthenticated} = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData =  {
        username: data.get("username"),
        password: data.get("password"),
      }

      const {data: {accesstoken, user}} = await request.post("auth/login", userData);
      toast.success("You are logged in !");
      setIsAuthenticated(user);
      localStorage.setItem(USER_DATA, JSON.stringify(user))
      Cookies.set(USER_TOKEN, accesstoken);
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
      router.push("/")
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer/>
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
          <h2 style={{color: "#ffc700", paddingBottom: "10px"}}>Vodiy Parfum</h2>
          <Typography component="h1" variant="h5">
            Kirish
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
              name="password"
              label="Parol"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
            style={{display: "flex", justifyContent: "end"}}
              control={<Checkbox value="remember" color="primary" />}
              label="Eslab qolish"
            />
            <Button
            style={{backgroundColor: "#ffc700", color: "#000"}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kirish
            </Button>
            <Grid style={{display: "flex", justifyContent: "center", paddingTop: "20px"}} container>
              <Grid item>
                <Link style={{color: "#000"}}  href="/register" variant="body2">
                  {"Hisobingiz yo`qmi? Ro`yxatdan o`tish"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
