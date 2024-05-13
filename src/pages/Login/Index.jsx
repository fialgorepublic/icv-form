import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { renderToPipeableStream } from "react-dom/server";
import toast from "react-hot-toast";

export default function Index({ user }) {
  console.log("user");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({ email: "", password: "" });

  const handelAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);
  };

  const handelLogin = (event) => {
    event.preventDefault();
    setLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admins/sign_in`,
        {
          admin: {
            email: account.email,
            password: account.password,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.headers["authorization"]);
          setLoader(false);
          toast.success("You are Logged in Successfully");
          localStorage.setItem("token", response.headers.authorization);
          navigate("/user-applications");
        } else {
          throw new Error(response);
        }
      })
      .then((data) => console.log("Then", data))
      .catch((error) => {
        setLoader(false);
        toast.error(error.response.data);
      });
    // axios
    // .post(
    //   "https://7255-182-178-149-233.ngrok-free.app/admins/sign_in",
    //   {
    //     admin: account,
    //   },
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    // )
    // .then(function (res) {
    //   debugger
    // })
    // .catch(function (error) {
    //   console.log("fahad", error);
    // })
  };

  return (
    <Grid
      container
      component="main"
      sx={{ display: "flex", justifyContent: "center", my: "70px" }}
    >
      <CssBaseline />
      {loader && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <CircularProgress />
        </Backdrop>
      )}
      <Grid
        className=""
        item
        xs={6}
        sm={6}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <Box sx={{ m: "auto", width: "70%" }}>
          <Avatar
            sx={{ m: "auto", bgcolor: "#f50057", m: "40px 0px 20px 145px" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Sign in
          </Typography>
          <form className="" noValidate>
            <TextField
              onChange={(event) => handelAccount("email", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="username"
              label="Username"
              name="email"
              autoFocus
            />
            <TextField
              onChange={(event) => handelAccount("password", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ m: "25px 0px" }}
              onClick={handelLogin}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
