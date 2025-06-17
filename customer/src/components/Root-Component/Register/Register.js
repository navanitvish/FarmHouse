import React, { useState } from "react";
import "./Register.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  //handle inputs
  const handleInput = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   console.log(inputData);

  //handle sumbit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputData.password === inputData.confirmPassword) {
      try {
        const response = await axios.post("/customer-register", inputData);
        const { name, email } = inputData;
        console.log(response.data);
        if (response.data.success) {
          // localStorage.setItem("user");
          toast.success(response.data.message);
          dispatch({
            type: "userDetails",
            payloade: { name: name, email: email },
          });
          navigate("/signin");
        } else {
          // toast.error(response.data.message)

          // console.log('errors', response.data.message)
          const errors = response.data.message;
          errors.forEach((err) => {
            toast.error(err.msg);
          });
        }
      } catch (error) {
        console.log(error);

        // console.log(error.response.data.message);
      }
    } else {
      toast.error("passwords dosen't match");
    }
  };

  return (
    <div className="registrationWrapper">
      <ThemeProvider theme={theme}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Account
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
                label="Full Name"
                name="name"
                value={inputData.name}
                onChange={handleInput}
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contact Number"
                name="contact"
                value={inputData.contact}
                onChange={handleInput}
                autoComplete="contact"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={inputData.email}
                onChange={handleInput}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={inputData.password}
                onChange={handleInput}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                value={inputData.confirmPassword}
                onChange={handleInput}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Register
              </Button>

              <Grid item>
                Already have an account?
                <Button onClick={() => navigate("/signin")}>Click here</Button>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
