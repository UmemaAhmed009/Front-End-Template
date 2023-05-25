
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
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

  const handleSelectLesson = (lessonName) => {
  
    axios.get(`http://localhost:3000/lesson/lessonName/${lessonName}`)
      .then(response => {
        console.log('I am Minal')
        const lessonID = response.data;
        setSelectedLesson(lessonID);
      navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details`);
      // navigate('/dashboard/user');
      // console.log(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details`);
        // window.location.href = `/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details`;

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
    <div>
      <Typography variant="h3" sx={{ mb: 5 }}>
      Lessons for Subject {subjectID}, Class {classID} and Unit {unitID}
        </Typography>
      <Grid container spacing={3}>
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
