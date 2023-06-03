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

export default function AnsweredQuestions() {


  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
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
    console.log(questions);
  }, [lessonID]);


  return (
    <div>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Answered Questions for Lesson {lessonID}
      </Typography>
      {questions.map((question) => (
        <div key={question._id} style={{ marginBottom: '20px' }}>
          <Typography variant="h5">{question.question_details}</Typography>
          <div>
            {question.question_image && (
              <img src={question.question_image} alt="Illustration of the question" style={{ maxWidth: '200px' }} />
            )}
          </div>
          <div>
            {question.answers.map((answer, index) => (
              <button
                key={index}
                style={{
                  ...buttonStyle,
                  backgroundColor: index === 0 ? 'green' : buttonStyle.backgroundColor,
                }}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  
}

