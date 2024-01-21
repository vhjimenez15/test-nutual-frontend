import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { post } from "../apirest";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (event) => {
    if (event.target.id === "username") {
      setUsername(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };

  const login = async () => {
    const response = await post("login", { username, password });
    console.log("response", response);
    if (response.status === 200) {
      const { token } = response.data;
      console.log("token", token);
      localStorage.setItem("accessToken", token);
      window.location.href = "/home";
    } else {
      console.log("responseError", response.error.msg);
      setError(true);
      setErrorMessage(response.error.msg);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            alt="Remy Sharp"
            src="https://www.nutual.com/wp-content/uploads/2021/09/cropped-logo.jpg"
          />

          <Typography sx={{ mt: 1 }} component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="Username"
              variant="outlined"
              size="small"
              value={username}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              autoComplete="Password"
              variant="outlined"
              size="small"
              value={password}
              onChange={handleChange}
              type="password"
              sx={{ mt: 1 }}
            />
            <Button
              fullWidth
              variant="contained"
              size="medium"
              onClick={() => login()}
              sx={{ mt: 3, mb: 2, color: "white", backgroundColor: "#ff0081" }}
            >
              Sign In
            </Button>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>

            {error && (
              <Alert sx={{ mt: 1 }} variant="filled" severity="error">
                {errorMessage}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
