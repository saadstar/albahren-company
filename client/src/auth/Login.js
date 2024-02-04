import React, { useState, useContext } from "react";
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
import { AuthContext } from "./authContext/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";

const defaultTheme = createTheme();

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      if (username === "") {
        toast.error("برجاء ادخال اسم المستخدم");
      } else if (password === "") {
        toast.error("برجاء ادخال كلمه المرور ");
      } else {
        const res = await axios.post("http://localhost:3500/api/auth/login", {
          username,
          password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        toast.success("مرحباً");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="login" style={{ height: "100vh", color: "white" }}>
      <ThemeProvider theme={defaultTheme}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <LockOutlinedIcon />
            <Typography component="h1" variant="h5">
              تسجيل الدخول
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="اسم المستخدم"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ color: "white" }}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                name="password"
                label="كلمه المرور"
                type="password"
                id="password"
                autoComplete="current-password"
                color="primary"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="تذكرني"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={clickHandler}
              >
                تسجيل الدخول
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup">ليس لديك حساب؟ إنشاء حساب</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
