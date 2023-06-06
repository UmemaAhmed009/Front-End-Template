import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, button } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import { Cookies } from 'react-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

// components
import Iconify from '../components/iconify';

//images
import User from '../static/User.jpg';
import Subject from '../static/Subject.jpeg';
import Class from '../static/Class.webp';
import Unit from '../static/unit.jpeg';
import Lesson from '../static/Lesson.jpeg';
import Question from '../static/question.jpeg';
import Answer from '../static/answer.jpeg';
import Progress from '../static/Progress.jpeg';
import Leaderboard from '../static/Leaderboard.jpeg';



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

// ----------------------------------------------------------------------

const gridButtonStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
};

const gridImageStyles = {
  width: '200px',
  height: '150px',
};

export default function AdminPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  let subjectID=null;
  const cookies = new Cookies();

  const handleSelectUser = () => {
    navigate('/admin/user');
  }
  const handleSelectSubject = () => {
    navigate('/admin/subjects');
  }
  const handleSelectLesson = () => {
    navigate('/admin/lessons');
  }


    return (
      <>
        <Helmet>
          <title> Admin Portal </title>
        </Helmet>
  
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back admin!
          </Typography>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Where would you like to go?
          </Typography>
          {/*User */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
            <button onClick={() => handleSelectUser()} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="Maths"  icon={'ant-design:android-filled'} /> */}
              <img src={User} alt="User" style={gridImageStyles} />
            </button>
            </Grid>
            {/* Subject */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectSubject()} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Subject} alt="Subject" style={gridImageStyles} />
              </button>
            </Grid>
            {/* Unit */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectSubject("English")} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Unit} alt="Unit" style={gridImageStyles} />
              </button>
            </Grid>
            {/* Lesson */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectLesson()} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Lesson} alt="Lesson" style={gridImageStyles} />
              </button>
            </Grid>
            {/* Question */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectSubject("English")} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Question} alt="Question" style={gridImageStyles} />
              </button>
            </Grid>
            {/* Answer */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectSubject("English")} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Answer} alt="Answer" style={gridImageStyles} />
              </button>
            </Grid>
            {/* Progress */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectSubject("English")} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Progress} alt="Progress" style={gridImageStyles} />
              </button>
            </Grid>
            {/* Leaderboard */}
            <Grid item xs={12} sm={6} md={3}>
              <button onClick={()=> handleSelectSubject("English")} style={{ ...gridButtonStyles }}>
              {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
              <img src={Leaderboard} alt="Leaderboard" style={gridImageStyles} />
              </button>
            </Grid>
          </Grid>  
      </Container>
    </>
  );
}
