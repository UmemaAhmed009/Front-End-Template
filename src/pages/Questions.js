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

// NEW
const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tryCounter, setTryCounter] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disabledOptions, setDisabledOptions] = useState([]);

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

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledAnswers(shuffleAnswers());
    }
  }, [questions, currentQuestionIndex]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTryCounter(0);
    setIsAnswerCorrect(false);
    setSelectedAnswer(null);
    setDisabledOptions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  const shuffleAnswers = () => {
    const shuffledAnswers = [...currentQuestion.answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = currentQuestion.answers[0]; // Assuming the correct answer is always at the first index of the original array

    if (selectedAnswer === correctAnswer) {
      setIsAnswerCorrect(true);
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } else {
      setTryCounter((prevCounter) => prevCounter + 1);
      setDisabledOptions((prevDisabledOptions) => [...prevDisabledOptions, selectedAnswer]);
    }
    setSelectedAnswer(selectedAnswer);
  };

  const styles = {
    // buttonContainer: {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'flex-start',
      
    // },
    button: {
      padding: '10px',
      margin: '5px',
      backgroundColor: '#41D1C6',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    correctButton: {
      backgroundColor: 'green',
      color: 'white',
    },
    incorrectButton: {
      backgroundColor: 'grey',
      color: 'white',
    },
  };

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Quiz Page!
      </Typography>
      <div>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {currentQuestion.question_details}
        </Typography>
        {currentQuestion.question_image && (
          <img
            src={currentQuestion.question_image}
            alt={`Question ${currentQuestionIndex + 1}`}
            style={{ width: '300px', height: '300px', marginBottom: '20px'}}
          />
        )}
        {/* <div style={ styles.buttonContainer }> */} 
        {shuffledAnswers.map((answer, index) => {
          const isCorrectAnswer = answer === currentQuestion.answers[0];
          const isClickedIncorrectAnswer = selectedAnswer === answer && !isCorrectAnswer;
          const isDisabled = disabledOptions.includes(answer);

          let buttonStyle = styles.button;
          if (isAnswerCorrect && isCorrectAnswer) {
            buttonStyle = { ...buttonStyle, ...styles.correctButton };
          } else if (isClickedIncorrectAnswer) {
            buttonStyle = { ...buttonStyle, ...styles.incorrectButton };
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              style={isDisabled ? { ...buttonStyle, ...{ backgroundColor: 'grey', cursor: 'not-allowed' } } : buttonStyle}
              disabled={isAnswerCorrect || isDisabled}
            >
              {answer}
            </button>
          );
        })}
        {/* </div> */}
        {tryCounter > 0 && !isAnswerCorrect && (
          <p>You have tried {tryCounter} time(s). Try again!</p>
        )}
        {isAnswerCorrect && (
          <p>Correct! The answer is {currentQuestion.answers[0]}.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;