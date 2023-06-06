import mongoose from 'mongoose';
import Cookies from "universal-cookie";
/* eslint-disable */
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [showPassword, setShowPassword] = useState(false);


  // const collectionName = 'users'
  // // Get the model for the collection
  // const User = mongoose.model(collectionName);

  // Count the number of users
  // User.countDocuments({}, function(err, count) {
  //   if (err) {
  //     console.error('Error counting documents:', err);
  //     mongoose.disconnect();
  //     return;
  //   }
  //   // Create an array of the desired size
  //   const users = [...Array(count)];

  //   console.log(users); // Array with the desired size

  //   mongoose.disconnect();
  // });

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:3001/user/login",
        data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
  .then((result) => {
    setLogin(true);
    // set the cookie
    cookies.set("accessToken", result.data.accessToken, {
      path: "/",
    });
    cookies.set("refreshToken", result.data.refreshToken, {
      path: "/",
    });
    const accessToken = cookies.get('accessToken');
    const decodedToken = jwt_decode(accessToken);
    if (accessToken) {
      try {
        const userId = decodedToken.userId;
        console.log("ACCESS TOKEN ", accessToken);
        console.log("USER ID ", userId);
        axios.get(`http://localhost:3001/user/${userId}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log("ACCESS TOKEN: ", accessToken);
            const user = response.data; // Renamed 'User' to 'user' for consistency
            console.log("User", user);
            const roleID = user.role_id; // Assuming the role ID is present in the response data
            console.log("ROLE ID", roleID);
            if (roleID === 1) {
              console.log("Navigating to /admin");
              window.location.href = "/admin";
            } else {
              console.log("Navigating to /home");
              window.location.href = "/home/app";
            }
          })
          .catch(error => {
            // Handle the error
            console.error('Error fetching user data:', error);
          });
      } catch (error) {
        // Handle decoding error
        console.error('Error decoding access token:', error);
      }
    }
  })
  .catch(error => {
    // Handle the error
    console.error('Error during login:', error);
  });
  }

        
    // make a popup alert showing the "submitted" text
    // alert("Submited");
  


  return (
    <>
      <Stack spacing={3}>
        {/* display success message */}
       {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address" />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth size="large"
        type="submit"
        variant="contained"
        onClick={(e) => handleSubmit(e)}>
        Login
      </LoadingButton>
    </>
  );
}
