import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';
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
  }, []);

  const handleQuizClick = () => {
    navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/lesson-details/question`);
  };

  const lessonStyle = {
    backgroundImage: `url(https://img.freepik.com/free-photo/3d-cartoon-background-children_23-2150150800.jpg?w=996&t=st=1685791595~exp=1685792195~hmac=c6889c6c3b09264752e72456a583bc0898377c0275e02b10eea5782323fb693a)`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundPosition: 'center 30%',
    justifyContent: 'center',
  };


  return (
    <div style={lessonStyle} className="lesson-container">
      {selectedLesson && (
        <>
         <div className="lesson-details-container">  
        <Typography
        variant="h2"
        sx={{
          fontSize: '40px',
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
        {selectedLesson.lessonDetails}
      </Typography>          
          </div>
          <div className="lesson-image-container">
            <img src={selectedLesson.lessonImage} alt="Lesson" style={{ width: '100%', height: 'auto', maxWidth: '500px' }}/>
          </div>
          <div className="quiz-button-container" style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleQuizClick}>
              Click to take quiz!
            </button>
          </div>
        </>
      )}
    </div>
  );
}

