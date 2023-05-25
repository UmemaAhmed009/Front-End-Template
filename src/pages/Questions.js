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

const buttonStyles = {
  display: 'block',
  margin: '10px',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#D877E3',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const nextButtonStyles = {
  display: 'block',
  marginTop: '10px',
  marginLeft: '100px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#2196f3',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { subjectID, classID, unitID, lessonID } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/question/lesson/${lessonID}`);
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [lessonID]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  const handleAnswerSelect = (answer) => {
    // Handle the selected answer here
    console.log(answer);
  };

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 0}}>
      Quiz Page!
      </Typography>
      <div>
      <Typography variant="h3" sx={{ mb: 1 }}>
      {currentQuestion.question_details}
      </Typography>
        {currentQuestion.question_image && (
           <img src={currentQuestion.question_image} alt={`Question ${currentQuestionIndex + 1}`} style={{ width: '300px', height: '300px' }}/>
        )}
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            style={buttonStyles}
          >
            {answer}
          </button>
        ))}
      </div>
      <button onClick={handleNextQuestion} style={nextButtonStyles}>Next</button>
    </div>
  );
};

export default Questions;
