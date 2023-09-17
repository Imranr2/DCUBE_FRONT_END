import React, { useState } from "react";
import {
  TextField as MuiTextField,
  Typography,
  Container,
  CssBaseline,
  inputClasses,
  inputLabelClasses,
  styled,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import api from "../api";

const TextField = styled(MuiTextField)(`
  .${inputClasses.root} {
    font-size: 10px;
  }
  .${inputLabelClasses.root} {
    font-size: 15px;
  }
`);

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    api.user
      .signIn(username, password)
      .then(() => navigate("/home"))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h1">
            Sign In
          </Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={handleSubmit}
          >
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <LoadingButton
              type="submit"
              loading={isLoading}
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Sign In
            </LoadingButton>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
