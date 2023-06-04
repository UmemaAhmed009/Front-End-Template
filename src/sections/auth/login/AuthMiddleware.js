import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = cookies.get('accessToken');
      const refreshToken = cookies.get('refreshToken');

      if (!accessToken && refreshToken) {
        await refreshTokens(refreshToken);
      } else if (!accessToken) {
        // Access token doesn't exist, redirect to the login page
        navigate('/login', { replace: true });
      } else {
        try {
          // Verify the validity of the access token
          const decodedToken = jwt_decode(accessToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Access token has expired, refresh the tokens
            console.log("HEHHEHE REFRESH")
            await refreshTokens(refreshToken);
          }
        } catch (error) {
          // Failed to decode the access token, redirect to the login page
          navigate('/login', { replace: true });
        }
      }
    };

    const refreshTokens = async (refreshToken) => {
        try {
          // Use the refresh token to generate a new pair of tokens using the API
          const response = await axios.post('http://localhost:3000/user/refresh-token', {
            refreshToken: refreshToken
          });
      
          const { accessToken, newRefreshToken } = response.data;
      
          // Save the new tokens to cookies
          cookies.set('accessToken', accessToken, { path: '/' });
          cookies.set('refreshToken', newRefreshToken, { path: '/' });
        } catch (error) {
          // Error occurred while refreshing tokens, handle the error
          console.error(error);
        }
      };
      
    checkAccessToken();
  }, []);

  return <>{children}</>;
};

export default AuthMiddleware;
