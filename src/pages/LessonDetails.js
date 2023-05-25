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


  return (
    <div className="lesson-container">
      {selectedLesson && (
        <>
         <div className="lesson-details-container">
         <Typography variant="h3" sx={{ mb: 5 }}>
         {selectedLesson.lessonDetails}
        </Typography>            
          </div>
          <div className="lesson-image-container">
            <img src={selectedLesson.lessonImage} alt="Lesson" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}/>
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

