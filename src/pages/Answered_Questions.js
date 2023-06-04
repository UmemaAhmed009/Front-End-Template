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
  marginLeft: '20px'

};

const AnswersStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  display: 'inline-block',
  color: '#FFFFFF',
  textAlign: 'center',
  margin: '20px',
  background:'linear-gradient(45deg, rgba(44, 211, 225, 0.75), rgba(134, 93, 255, 0.6))',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, background 0.3s ease',
  cursor: 'default',
};

const kidImage ={
  position: 'absolute',
  top: 0,
  right: 0,
  width: '650px',
  height: 'auto',
  marginRight: '20px',
  marginTop: '100px',

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
    <div style={{
      backgroundColor: '#FFFFFF'
    }}>
      <Typography variant="h3" sx={AnswersStyle}>
        Answered Questions for Lesson {lessonID}
      </Typography>
      {questions.map((question) => (
        <div key={question._id} style={{ marginBottom: '20px' }}>
          <Typography variant="h5" sx={{marginLeft: '20px'}}>{question.question_details}</Typography>
          <div>
            {question.question_image && (
              <img src={question.question_image} alt="Illustration of the question" style={{ maxWidth: '200px', marginLeft:'100px', marginBottom: '20px' }} />
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
       <img src={'https://img.freepik.com/free-vector/happy-boy-cloud-template_1308-36073.jpg?w=740&t=st=1685903536~exp=1685904136~hmac=8cfea033545d004af983b15c5f8c0fce9ddc5a13c1156abe733736af28082364'} alt="Illustration of the question" style={kidImage} />
    </div>
  );
  
  
}

