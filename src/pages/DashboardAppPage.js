import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, useEffect, Button } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import { Cookies } from 'react-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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

const progressContainerStyles = {
  marginTop: '20px',
};

const unitStyles = {
  fontWeight: 'bold',
  marginBottom: '10px',
};

const lessonStyles = {
  marginBottom: '10px',
};

const lessonCompletedStyles = {
  display: 'flex',
  alignItems: 'center',
};

const lessonIconStyles = {
  marginRight: '5px',
};

export default function DashboardAppPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  let subjectID=null;
  const cookies = new Cookies();
  let userId=null;
  const accessToken = cookies.get('accessToken');
  if (accessToken) {
    try {
      // Decode the access token to extract user ID
      const decodedToken = jwt_decode(accessToken);
      userId = decodedToken.userId;

    } catch (error) {
      // Handle decoding error
      console.error('Error decoding access token:', error);
    }
  }


  const handleSelectSubject = (subjectName) => {

    axios.get(`http://localhost:3000/subject/subjectName/${subjectName}`)
      .then(response => {
        subjectID = response.data;
        setSelectedSubject(subjectID);
        // navigate('/dashboard/user');
        //  navigate(`/subject/${subjectID}/classes`);

        console.log("SUB ID 1",subjectID)

        // post api for progress
        // Make the POST request with the user ID
        axios.post('http://localhost:3000/progress', {
          
          user_id: userId,
          subject_id: subjectID
        })
          .then(response => {
            // Handle the response
            console.log(response.data);
            navigate(`/subject/${subjectID}/classes`);
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          }); 
      })
      .catch(error => {
      console.error(error);
    });
      
  }

  useEffect(() => {
    // Fetch progress data from the backend API
    console.log("HIII");
    console.log("USER ",userId);
    axios.get(`http://localhost:3000/progress/user/${userId}`)
    .then(response => {
      const dashboard = response.data;
      console.log("Progress dashboard ",dashboard)
      setDashboard(dashboard);
    }).catch(error => {
      console.error('Error fetching progress data:', error);
    });
  }, [userId]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

//   return (
//     <>
//       <Helmet>
//         <title>Dashboard | Minimal UI</title>
//       </Helmet>
  
//       <Container maxWidth="xl">
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Choose a subject
//         </Typography>
  
//         <Grid container spacing={2}>
//           {progressData.subjects.map(subject => (
//             <Grid item xs={12} sm={6} md={3} key={subject._id}>
//               <button onClick={() => handleSelectSubject(subject._id)} style={{ ...gridButtonStyles }}>
//                 <img src={subject.image} alt={subject.name} style={gridImageStyles} />
//               </button>
//             </Grid>
//           ))}
//         </Grid>
  
//         {/* Render progress table */}
//         {progressData.subjects.map(subject => (
//           <div key={subject._id}>
//             <h2>Subject: {subject.name}</h2>
//             {subject.classes.map(classData => (
//               <div key={classData._id}>
//                 <h3>Class: {classData._id}</h3>
//                 {classData.units.map(unit => (
//                   <div key={unit._id}>
//                     <h4>Unit: {unit._id}</h4>
//                     <p>Unit Progress: {unit.unit_progress}</p>
//                     <p>Total Lessons: {unit.total_lessons}</p>
//                     <p>Completed Lessons: {unit.completed_lessons}</p>
//                     <p>Unit Started At: {unit.unit_started_at}</p>
//                     {unit.is_completed && (
//                       <p>Unit Completed At: {unit.unit_completed_at}</p>
//                     )}
  
//                     {/* Render lessons */}
//                     {unit.lessons.map(lesson => (
//                       <div key={lesson._id}>
//                         <h5>Lesson: {lesson._id}</h5>
//                         <p>Lesson Progress: {lesson.lesson_progress}</p>
//                         <p>Total Questions: {lesson.total_questions}</p>
//                         <p>Correct Answers: {lesson.correct_answers}</p>
//                         <p>Total Tries: {lesson.total_tries}</p>
//                         {lesson.is_completed && (
//                           <p>Lesson Completed At: {lesson.lesson_completed_at}</p>
//                         )}
  
//                         {/* Render answer status */}
//                         {lesson.answer_status.map(answer => (
//                           <div key={answer._id}>
//                             <p>Question ID: {answer._id}</p>
//                             <p>Is Correct: {answer.is_correct ? 'Yes' : 'No'}</p>
//                             <p>Tries: {answer.tries}</p>
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}
//       </Container>
//     </>
//   );
// }  

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
          <button onClick={() => handleSelectSubject("Maths")} style={{ ...gridButtonStyles }}>
            {/* <AppWidgetSummary title="Maths"  icon={'ant-design:android-filled'} /> */}
            <img src="https://img.freepik.com/free-vector/number-0-9-with-math-symbols_1308-104131.jpg" alt="Maths" style={gridImageStyles} />
          </button>
          </Grid>
          
          
          <Grid item xs={12} sm={6} md={3}>
            <button onClick={()=> handleSelectSubject("English")} style={{ ...gridButtonStyles }}>
            {/* <AppWidgetSummary title="English" color="info" icon={'ant-design:apple-filled'} /> */}
            <img src="https://img.freepik.com/free-vector/font-design-read-book-with-kid-reading-book_1308-81788.jpg?w=826&t=st=1685034857~exp=1685035457~hmac=6d0354bf9b49b0e63d07d8ffed8225969fe5df59674aa7aa38c9c738ce6bd038" alt="Maths" style={gridImageStyles} />
            </button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <button onClick={()=> handleSelectSubject("Science")} style={{ ...gridButtonStyles }}>
            {/* <AppWidgetSummary title="Science" color="warning" icon={'ant-design:windows-filled'} /> */}
            <img src="https://img.freepik.com/free-vector/scientist-working-with-science-tools-lab_1308-37836.jpg?w=740&t=st=1685034819~exp=1685035419~hmac=0968ac54bafacbf7e2d69b8ba9c4dcdd7adb1e2faade8389bfd6b0e949f5b8cf" alt="Science" style={gridImageStyles} />
          </button>
          </Grid>
        </Grid>
          {/* Progress Grid */}

      
    <div style={progressContainerStyles}>
      <h3>Progress Grid</h3>
      {dashboard && dashboard.subjects ? (
        dashboard.subjects.map((subject) => (
          <div key={subject._id}>
            <h4>{subject.name}</h4>
            {subject.classes.map((classItem) => (
              <div key={classItem._id}>
                <h5>{classItem.name}</h5>
                {classItem.units.map((unit) => (
                  <div key={unit._id}>
                    <h6 style={unitStyles}>
                      {unit.name} - Unit Progress: {unit.unit_progress}%
                    </h6>
                    <div>
                      <p>Completed Lessons: {unit.completed_lessons}/{unit.total_lessons}</p>
                      <p>Unit Started At: {formatTimestamp(unit.unit_started_at)}</p>
                      {unit.is_completed && (
                        <p>Unit Completed At: {formatTimestamp(unit.unit_completed_at)}</p>
                      )}
                    </div>
                    {unit.lessons.map((lesson) => (
                      <div key={lesson._id} style={lessonStyles}>
                        <p style={lessonCompletedStyles}>
                          {lesson.is_completed ? (
                            <FontAwesomeIcon icon={faCheckCircle} style={lessonIconStyles} />
                          ) : (
                            <CircularProgress size={12} />
                          )}
                          Lesson {lesson._id}: {lesson.is_completed ? 'Completed' : 'In Progress'}
                        </p>
                        {lesson.is_completed && (
                          <>
                            <p>Lesson Progress: {lesson.lesson_progress}%</p>
                            <p>Correct Answers: {lesson.correct_answers}/{lesson.total_questions}</p>
                            <p>Total Tries: {lesson.total_tries}</p>
                            <p>Lesson Completed At: {formatTimestamp(lesson.lesson_completed_at)}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading progress data...</p>
      )}
    </div>




          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}


        
      </Container>
    </>
  );
}