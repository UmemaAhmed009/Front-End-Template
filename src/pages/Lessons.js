// import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// import axios from 'axios';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// import { useNavigate, Link } from 'react-router-dom';
// // import {button} from React;

// import { useState, button } from 'react';
// // components
// import Iconify from '../components/iconify';

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

export default function Lessons() {
  const navigate = useNavigate();
  const { subjectID, classID, unitID } = useParams();
  const [lessons, setLessons] = useState([]);

  
  const [setSelectedLesson] = useState(null);

  const handleSelectLesson = (lessonName) => {
  
    axios.get(`http://localhost:3000/lesson/lessonName/${lessonName}`)
      .then(response => {
        const lessonID = response.data;
        setSelectedLesson(lessonID);
      navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details`);

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
      <h1>Lessons for Subject {subjectID}, Class {classID} and Unit {unitID}</h1>
      <Grid container spacing={3}>
        {lessons.map(lesson => (
          <Grid item xs={12} sm={6} md={3} key={lesson._id}>
            <button onClick={() => handleSelectLesson(lesson.lesson_name)}>
              <AppWidgetSummary title={lesson.lesson_name} icon={'ic:outline-child-care'} />
            </button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
  
  
  }
