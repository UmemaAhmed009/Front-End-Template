
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';

import { Cookies } from 'react-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

import { useState, button, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';



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

const lessonButtonStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '80px',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  background: 'linear-gradient(to right, #330B88, #880B1C)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
};

const lessonButtonHoverStyles = {
  transform: 'scale(1.05)',
};

const handleMouseEnter = (e) => {
  e.target.style.transform = lessonButtonHoverStyles.transform;
}; 

const handleMouseLeave = (e) => {
  e.target.style.transform = 'scale(1)';
};

export default function Lessons() {
  const navigate = useNavigate();
  const { subjectID, classID, unitID } = useParams();
  const [lessons, setLessons] = useState([]);
  
  const [selectedLesson, setSelectedLesson] = useState(null);

  let lessonID=null;
  const cookies = new Cookies();

  const handleSelectLesson = (lessonName) => {
  
    axios.get(`http://localhost:3000/lesson/lessonName/${lessonName}`)
      .then(response => {
        console.log('I am Minal')
        const lessonID = response.data;
        setSelectedLesson(lessonID);
      // navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details`);
      
      const accessToken = cookies.get('accessToken');

      if (accessToken) {
        try {
          // Decode the access token to extract user ID
          const decodedToken = jwt_decode(accessToken);
          const userId = decodedToken.userId;
          console.log("USER ID ",userId)
          console.log("lesson ID ",lessonID)

          // Make the POST request with the user ID
          axios.put(`http://localhost:3000/progress/user/${userId}/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson`, {
            lesson_id: lessonID
          })
            .then(response => {
              // Handle the response
              console.log(response.data);
              navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details`);
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


  useEffect(() => {
    const fetchLessons = async () => {
      const response = await axios.get(`http://localhost:3000/lesson/unit/${unitID}`);
      setLessons(response.data);
    };
    fetchLessons();
  }, []);

  return (
    <div style={{
      backgroundImage: 'url(https://img.freepik.com/free-vector/kids-playing-school-compound-park_1308-32285.jpg?w=1380&t=st=1685786732~exp=1685787332~hmac=3601958f512a2ba63a700a74c5c9f5d74a877b2aaead64002498d421447e427b)',
      backgroundSize: 'cover',
      opacity: '0.85',
      backgroundPosition: 'center bottom',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>

      <Typography
        variant="h1"
        sx={{
          fontSize: '64px',
          fontFamily: 'Noto Serif',
          color: '#890596',
          fontStyle: 'italic',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          letterSpacing: '2px',
          marginBottom: '40px'
        }}
      >
        SELECT A LESSON
      </Typography>
      <Grid container spacing={3} style={{ marginLeft: '10px'}}>
        {lessons.map(lesson => (
          <Grid item xs={12} sm={6} md={3} key={lesson._id}>
            <button onClick={() => handleSelectLesson(lesson.lesson_name)} style={{ ...lessonButtonStyles }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>{lesson.lesson_name}    
            </button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
  
  }
