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
import { useState, button } from 'react';
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

export default function Classes() {


const navigate = useNavigate();
const [selectedClass, setSelectedClass] = useState(null);
const { subjectID } = useParams(); // extracting subject id from url

const handleSelectClass = (className) => {
  
  axios.get(`http://localhost:3000/class/className/${className}`)
    .then(response => {
      const classID = response.data;
      setSelectedClass(classID);
    // navigate('/dashboard/user');
    //  navigate(`/subject/subjectID/classes/${classID}/units`);
    navigate(`/subject/${subjectID}/class/${classID}/units`);

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

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* <button > */}
            <AppWidgetSummary title="KG" icon={'ant-design:android-filled'} onClick={() => handleSelectClass('KG')}/>
            {/* </button> */}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
             <button onClick={() => handleSelectClass('CLASS 1')}>
              <AppWidgetSummary title="CLASS 1" icon={'ant-design:android-filled'} />
            </button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <button onClick={() => handleSelectClass('CLASS 2')}>
            <AppWidgetSummary title="CLASS 2" icon={'ant-design:android-filled'} />
            </button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <button onClick={() => handleSelectClass('CLASS 3')}>
            <AppWidgetSummary title="CLASS 3" icon={'ant-design:android-filled'} />
            </button>
          </Grid>


        </Grid>
      </Container>
    </>
  );
}