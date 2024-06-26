import * as React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function PoliceLogin() {

  let uri;

  if (process.env.NODE_ENV === 'development') {
      // Running in local development environment
      uri = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  } else {
      // Running in production or staging environment
      uri = process.env.REACT_APP_API_URI;
  }
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    policeId: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPasswordError("");

    // perform password validation...

    if (formData.password.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);

    if (!isFormValid) {
      return;
    } else {
      try {
        const response = await axios.post(uri+"/api/police/policeLogin",
          formData
        );
        console.log("API Response:", response.data);
        if (response.data.error) {
          toast.error(response.data.error)
          return;
        } 
        else {
          toast.success(response.data.message)
          setTimeout(()=>{
            navigate("/policeDashboard"); // user will navigeted to login page after successful signup.
          },1000)

        }
      } 
      catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
        <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Police Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="policeId"
                label="Police ID"
                name="policeId"
                autoFocus
                value={formData.adminId}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              {passwordError && (
                <div>
                  <Alert severity="error">{passwordError}</Alert>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    <ToastContainer/>
    </>
  );
}
