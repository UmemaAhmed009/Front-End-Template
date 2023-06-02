import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { Cookies } from 'react-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

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

  // const shuffleAnswers = () => {
  //   const shuffledAnswers = [...currentQuestion.answers];
  //   for (let i = shuffledAnswers.length - 1; i > 0; i -= 1) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
  //   }
  //   return shuffledAnswers;
  // };

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

  const shuffleAnswers = () => {
    if (!currentQuestion) {
      return []; // Return an empty array if there are no more questions
    }
  
    const shuffledAnswers = [...currentQuestion.answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };
  
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTryCounter(0);
    setIsAnswerCorrect(false);
    setSelectedAnswer(null);
    setDisabledOptions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Congratulations! You have completed the lesson!</p>;
  }

  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = currentQuestion.answers[0]; // db has correct ans on the first index of the ans array
    console.log(selectedAnswer);
    console.log(correctAnswer);
  
    const isCorrect = selectedAnswer === correctAnswer;
    setIsAnswerCorrect(isCorrect);
  
    if (isCorrect) {
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } else {
      setTryCounter((prevCounter) => prevCounter + 1);
      setDisabledOptions((prevDisabledOptions) => [...prevDisabledOptions, selectedAnswer]);
    }
  
    setSelectedAnswer(selectedAnswer);
    makeApiCall(isCorrect);
  };
  
  const makeApiCall = (isCorrect) => {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
  
    if (accessToken) {
      try {
        const decodedToken = jwt_decode(accessToken);
        const userId = decodedToken.userId;
  
        const questionID = currentQuestion._id.toString();
        const numTries = tryCounter.toString();
  
        axios.put(`http://localhost:3000/progress/user/${userId}/subject/${subjectID}/class/${classID}/unit/${unitID}/lesson/${lessonID}/answer_status`, {
          question_id: questionID,
          is_correct: isCorrect.toString(),
          tries: numTries
        })
          .then(response => {
            console.log("API call successful");
            console.log(response.data);
          })
          .catch(error => {
            console.error("API call error:", error);
          });
      } catch (error) {
        console.error('Error decoding access token:', error);
      }
    }
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
  
//   return (
//     <div>
//       <Typography variant="h3" sx={{ mb: 0 }}>
//         Quiz Page!
//       </Typography>
//       {currentQuestionIndex < questions.length ? (
//       <div>
//         <Typography variant="h3" sx={{ mb: 1 }}>
//           {currentQuestion.question_details}
//         </Typography>
//         {currentQuestion.question_image && (
//           <img
//             src={currentQuestion.question_image}
//             alt={`Question ${currentQuestionIndex + 1}`}
//             style={{ width: '300px', height: '300px', marginBottom: '20px'}}
//           />
//         )}
//         {/* <div style={ styles.buttonContainer }> */} 
//         {shuffledAnswers.map((answer, index) => {
//           const isCorrectAnswer = answer === currentQuestion.answers[0];
//           const isClickedIncorrectAnswer = selectedAnswer === answer && !isCorrectAnswer;
//           const isDisabled = disabledOptions.includes(answer);

//           let buttonStyle = styles.button;
//           if (isAnswerCorrect && isCorrectAnswer) {
//             buttonStyle = { ...buttonStyle, ...styles.correctButton };
//           } else if (isClickedIncorrectAnswer) {
//             buttonStyle = { ...buttonStyle, ...styles.incorrectButton };
//           }

//           return (
//             <button
//               key={index}
//               onClick={() => handleAnswerSelect(answer)}
//               style={isDisabled ? { ...buttonStyle, ...{ backgroundColor: 'grey', cursor: 'not-allowed' } } : buttonStyle}
//               disabled={isAnswerCorrect || isDisabled}
//             >
//               {answer}
//             </button>
//           );
//         })}
//         {/* </div> */}
//         {tryCounter > 0 && !isAnswerCorrect && (
//           <p>You have tried {tryCounter} time(s). Try again!</p>
//         )}
//         {isAnswerCorrect && (
//           <p>Correct! The answer is {currentQuestion.answers[0]}.</p>
//         )}
//       </div>
//       ) : (
//         <p>Congratulations! You have completed this lesson.</p>
//       )};
//     </div>
//   );
// };

export default Questions;