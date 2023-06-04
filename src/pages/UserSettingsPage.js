import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

export default function UserSettingsPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  let userId = null;
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const decodedToken = jwt_decode(accessToken);
          userId = decodedToken.userId;
          const response = await axios.get(`http://localhost:3000/user/${userId}`);
          const user = response.data;
          console.log('User', user);
          setUser(user);
          setName(user.name);
          setAge(user.age);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
    console.log("USER ID", userId)
  }, [accessToken]);

  const isValidPassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(value);
  };
//   At least 8 characters
// Contains at least one uppercase letter
// Contains at least one lowercase letter
// Contains at least one digit
// Contains at least one special character (!@#$%^&*)
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorPassword(false);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrorConfirmPassword(false);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSaveChanges = () => {
    console.log("USER ID PUT", user._id)
      if (!password || password === '********' || isValidPassword(password)) {
        if (password === confirmPassword) {
          // TODO: Perform update logic here
          console.log('Name:', name);
          console.log('Password:', password);
          console.log('Age:', age);

          // If the password is empty or unchanged, set it to the original password
          const updatedPassword = password || user.password;

          axios
            .put(`http://localhost:3000/user/${user._id}`, {
              name: name,
              password: updatedPassword,
              age: age,
            })
            .then((response) => {
              console.log(response.data);
              // Redirect or show success message
              // navigate('/success'); // Update with the desired route
              setSuccessMessage('Changes saved successfully.');
              // Clear the success message after a few seconds
              setTimeout(() => {
                setSuccessMessage('');
              }, 3000);
            })
            .catch((error) => {
              console.error(error);
              // Show error message
              setErrorMessage('Failed to save changes. Please try again.');
              setTimeout(() => {
                setErrorMessage('');
              }, 3000);
            });
        } else {
          // Password and confirm password do not match
          setErrorConfirmPassword(true);
          setErrorMessage('Password and confirm password do not match.');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      } else {
        // Invalid password
        setErrorPassword(true);
        setErrorMessage('Invalid password. Please enter a valid password.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
  };

  return (
    <Box mt={4} p={4}>
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
            Profile Preview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                fullWidth
                variant="outlined"
                error={errorPassword}
                helperText={errorPassword && 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                type="password"
                fullWidth
                variant="outlined"
                error={errorConfirmPassword}
                helperText={errorConfirmPassword && 'Passwords do not match.'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Age"
                value={age}
                onChange={handleAgeChange}
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          {errorMessage && (
            <Box mt={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          )}
          {successMessage && (
            <Box mt={2}>
              <Alert severity="success">{successMessage}</Alert>
            </Box>
          )}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSaveChanges}
              sx={{ borderRadius: '24px', fontWeight: 'bold' }}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
