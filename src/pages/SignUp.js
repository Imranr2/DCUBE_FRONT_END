import React, { useState } from "react";
import {
  TextField as MuiTextField,
  Typography,
  Container,
  CssBaseline,
  Link,
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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length > 32) {
      setUsernameError("Username can be at most 32 characters long");
      return;
    } else {
      setUsernameError("");
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }
    setIsLoading(true);
    api.user
      .signUp(username, password)
      .then(() => navigate("/"))
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
            Sign Up
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
              error={!!usernameError}
              helperText={usernameError}
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
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <LoadingButton
              type="submit"
              loading={isLoading}
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Sign Up
            </LoadingButton>
          </form>
        </div>
        <Link href="/" variant="subtitle1" underline="hover">
          Already have an account? Sign in here!
        </Link>
      </Container>
    </div>
  );
};

export default SignUp;
