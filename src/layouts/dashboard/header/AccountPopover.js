import axios from 'axios';
import { useState, useEffect, Button } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
/* eslint-disable */
import jwt_decode from 'jwt-decode';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

// mocks_


import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  let userId = null;

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const decodedToken = jwt_decode(accessToken);
          userId = decodedToken.userId;
          const response = await axios.get(`http://localhost:3000/user/${userId}`);
          const user = response.data;
          console.log("User", user);
          setUser(user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [accessToken]);

  
 

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (optionIndex) => {
    if (optionIndex == 0) {
      navigate(`/subject`); // Navigate to the Home page
    } else if (optionIndex == 1) {
      navigate(`/subject`);; // Navigate to the Profile page
    } else if (optionIndex == 2) {
      navigate('/user-settings'); // Navigate to the Settings page
    }

    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
        {MENU_OPTIONS.map((option, index) => (
            <MenuItem key={option.label} onClick={() => handleClose(index)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
