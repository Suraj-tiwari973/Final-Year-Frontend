import * as React from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link,useNavigate} from "react-router-dom";
import M from "materialize-css"
import { useState } from 'react';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminRegister() {

  const preAdminId = "police";
  const prePassword = "1234";

  const [formData, setFormData] = useState({
    adminId:'',
    password:''
  });

  // const navigate = useNavigate();
  
  const [isFormValid, setIsFormValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    setPasswordError('');


    // perform password validation.

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      setIsFormValid(false);
      return;
    }
    if(formData.adminId !== preAdminId && formData.password !== prePassword){
      console.log(formData.adminId,formData.password);
      setIsFormValid(false);
      M.toast({html:"Invalid Username or Password",classes:"#d32f2f red darken-2"});
      return
      
    }
    else{
      console.log("Invalid Username or Password");
      setIsFormValid(true);
      M.toast({html:"Logged In Succesfully",classes:"#d32f2f green darken-2"});
    }
    setIsFormValid(true);

    if(!isFormValid){
      return;
    }

    // Sending the login data to the server.

    // fetch('/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {

    //   // Handle the response from the server to show it to the user.

    //     console.log(data);
    //     if(data.error){
    //       M.toast({html: data.error,classes:"#f44336 red"});
    //       return;
    //     }
    //     else{
          
    //       M.toast({html:"Signed In Successfuly.",classes:"#2e7d32 green darken-3"})
    //       navigate('/home',{state:{id:formData.username}}); 
          
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="adminId"
                label="Admin ID"
                name="adminId"
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
              {passwordError && <div><Alert severity="error">{passwordError}</Alert></div>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container justifyContent="flex-end">
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link to="/adminLogin" >
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}