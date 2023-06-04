import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, button } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { Cookies } from 'react-cookie';

/* eslint-disable */
import jwt_decode from 'jwt-decode';

// components
import Iconify from '../components/iconify';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// import React from 'react';

const classButtonStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '80px',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  background: 'linear-gradient(to right, #ff5722, #f50057)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
};

const classButtonHoverStyles = {
  transform: 'scale(1.05)',
};

const handleMouseEnter = (e) => {
  e.target.style.transform = classButtonHoverStyles.transform;
}; 

const handleMouseLeave = (e) => {
  e.target.style.transform = 'scale(1)';
};


export default function Classes() {

const navigate = useNavigate();
const [selectedClass, setSelectedClass] = useState(null);
const { subjectID } = useParams(); // extracting subject id from url
let classID=null;
const cookies = new Cookies();

const handleSelectClass = (className) => {
  
  axios.get(`http://localhost:3000/class/className/${className}`)
    .then(response => {
      classID = response.data;
      setSelectedClass(classID);
    // navigate('/dashboard/user');
    //  navigate(`/subject/subjectID/classes/${classID}/units`);
    // navigate(`/subject/${subjectID}/class/${classID}/units`);

      const accessToken = cookies.get('accessToken');

      if (accessToken) {
        try {
          // Decode the access token to extract user ID
          const decodedToken = jwt_decode(accessToken);
          const userId = decodedToken.userId;
          console.log("USER ID ",userId)
          
          console.log("sub id ", subjectID)

          console.log("class id ", classID)
          // Make the POST request with the user ID
          axios.put(`http://localhost:3000/progress/user/${userId}/subject/${subjectID}/class`, {
            class_id: classID
          })
            .then(response => {
              // Handle the response
              console.log(response.data);
              navigate(`/subject/${subjectID}/class/${classID}/units`);
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
        } catch (error) {
          // Handle decoding error
          console.error('Error decoding access token:', error);
        }
      }

    })
    .catch(error => {
      console.error(error);
    });

  }
  return (
    <>
      <Helmet>
        <title> Classes </title>
      </Helmet>
      <div style={{
          backgroundImage: 'url(https://img.freepik.com/free-photo/plasticine-clay-patterned-background-white-colorful-border-diy-creative-art-kids_53876-146296.jpg?w=996&t=st=1685870124~exp=1685870724~hmac=7356ad4d706664f8fe84318821b513dd14ecf274106fa4dffcce64ed769bee96)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          minHeight: '100vh',
        }}>
      <Container maxWidth="xl">
          <Typography
            variant="h1"
            sx={{
              fontSize: '64px',
              fontFamily: 'Alice',
              color: '#C70A80',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              letterSpacing: '2px',
              marginBottom: '40px'
            }}
          >
            SELECT A CLASS
          </Typography>

        <Grid container spacing={3}>
         
          <Grid item xs={12} sm={6} md={3}>
             <button  onClick={() => handleSelectClass('KG')}
              style={{ ...classButtonStyles }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>KG</button>
              </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <button  onClick={() => handleSelectClass('CLASS 1')}
              style={{ ...classButtonStyles }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>CLASS 1</button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <button  onClick={() => handleSelectClass('CLASS 2')}
              style={{ ...classButtonStyles }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>CLASS 2</button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <button  onClick={() => handleSelectClass('CLASS 3')}
              style={{ ...classButtonStyles }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>CLASS 3</button>
          </Grid>


        </Grid>
      </Container>
      </div>
    </>
  );
}
