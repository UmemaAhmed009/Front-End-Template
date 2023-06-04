import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';


import { Cookies } from 'react-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

// components
import Iconify from '../components/iconify';


const buttonContainerStyle = {
  position: 'fixed',
  bottom: '50px',
  right: '50px',
};

const buttonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',

};

export default function LessonDetails() {

  const navigate = useNavigate();
  const { subjectID, classID, unitID, lessonID } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  let userId=null;
  const cookies = new Cookies();
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/lesson/${lessonID}`)
      .then((response) => { 
        console.log(response.data);
        const details = response.data.lesson_details;
        const image  = response.data.lesson_image;
        setSelectedLesson({
          lessonDetails: details,
          lessonImage: image
        });
      })
      .catch((error) => {
        console.error(error);
      });

      const isLessonCompleted = async () => {
        const response = await axios.get(`http://localhost:3000/progress/user/${userId}/lesson/${lessonID}/completed`);
        setIsCompleted(response.data.isLessonCompleted);
        console.log("ASNWER ",isCompleted);
      };
      isLessonCompleted();

  }, []);

  const handleQuizClick = () => {
    if (isCompleted){
      navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details/answered-questions`);
    }
    else{
      navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details/question`);
    }
    
  };

  const lessonStyle = {
    backgroundImage: `url(https://img.freepik.com/premium-photo/fun-round-confetti-frame-celebration-background_574033-231.jpg?size=626&ext=jpg&ga=GA1.2.2091757336.1680171558&semt=ais)`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundPosition: 'center 50%',
    justifyContent: 'center',
  };


  return (
    <div style={lessonStyle} className="lesson-container">
      {selectedLesson && (
        <>
         <div className="lesson-details-container">  
  
        <p
        style={{
          fontSize: '30px',
          fontFamily:'Feather Bold !important: true', 
          color: '#FFFFFF',
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: '2px',
          marginBottom: '40px',
          marginTop: '20px',
          background:'linear-gradient(45deg, rgba(88, 204, 2,1), rgba(137, 226, 25,0.75)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}>{selectedLesson.lessonDetails}</p>          
          </div>
          <div className="lesson-image-container">
            <img src={selectedLesson.lessonImage} alt="Lesson" style={{ width: '100%', height: 'auto', maxWidth: '500px' }}/>
          </div>
          <div className="quiz-button-container" style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleQuizClick}>
              {isCompleted ? 'View Answers' : 'Click to take a quiz'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

