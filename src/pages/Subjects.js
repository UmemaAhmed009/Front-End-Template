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
  
  
  export default function Subjects() {
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
            Choose a subject
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
        </Container>
    </>
    );
}
    
  