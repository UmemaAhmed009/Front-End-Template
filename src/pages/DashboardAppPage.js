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


export default function DashboardAppPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  let subjectID=null;
  const cookies = new Cookies();

  const handleSelectSubject = (subjectName) => {

    axios.get(`http://localhost:3000/subject/subjectName/${subjectName}`)
      .then(response => {
        subjectID = response.data;
        setSelectedSubject(subjectID);
        // navigate('/dashboard/user');
        //  navigate(`/subject/${subjectID}/classes`);

        console.log("SUB ID 1",subjectID)

        // post api for progress
        // Get the access token from cookies
        const accessToken = cookies.get('accessToken');
        

        if (accessToken) {
          try {
            // Decode the access token to extract user ID
            const decodedToken = jwt_decode(accessToken);
            const userId = decodedToken.userId;
            console.log("USER ID ",userId)
            console.log("SUB ID ",subjectID)
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
          </Grid>*/}

          {/* <Grid item xs={12} md={6} lg={4}>
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
          </Grid> */}
{/* 
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
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
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
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
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
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
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
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
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
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
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
        </Grid>
      </Container>
    </>
  );
}
