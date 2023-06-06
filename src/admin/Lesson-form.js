import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
} from '@mui/material';
import Cookies from 'universal-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

const LessonForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lessonId, setLessonId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [lessonDetails, setLessonDetails] = useState('');
  const [lessonImage, setLessonImage] = useState('');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
  
//     // Check if query parameters exist
//     if (queryParams.has('lessonId')) {
//       const storedLessonId = queryParams.get('lessonId');
//       const storedUnitId = queryParams.get('unitId');
//       const storedLessonName = queryParams.get('lessonName');
//       const storedLessonDetails = queryParams.get('lessonDetails');
//       const storedLessonImage = queryParams.get('lessonImage');
  
//       // Set the form values from query parameters
//       setFormLessonId(storedLessonId);
//       setUnitId(storedUnitId);
//       setLessonName(storedLessonName);
//       setLessonDetails(storedLessonDetails);
//       setLessonImage(storedLessonImage);
//     } else {
//       // Restore the form values from session storage
//       const storedFormData = localStorage.getItem('lessonFormData');
  
//       if (storedFormData) {
//         const formData = JSON.parse(storedFormData);
//         setFormLessonId(formData.lessonId);
//         setUnitId(formData.unitId);
//         setLessonName(formData.lessonName);
//         setLessonDetails(formData.lessonDetails);
//         setLessonImage(formData.lessonImage);
//       }
//     }
//   }, [location.search]);
  

//   // Generate a unique _id using UUID
//   // const lessonId = uuidv4();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear the stored form data in localStorage
    // localStorage.removeItem('lessonFormData');

    const lessonsData = {
        lesson_id : lessonId,
        unit_id : unitId,
        lesson_name : lessonName,
        lesson_details: lessonDetails,
        lesson_image: lessonImage,
    }
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    const decodedToken = jwt_decode(accessToken);
    if(accessToken){
    try{
    const lessonId = decodedToken.lessonId;
    console.log("ACCESS TOKEN", accessToken);
    console.log(lessonsData);
    // Make the API request to update the user's data
    axios.post(`http://localhost:3000/lesson`, lessonsData, {
      headers: {
      'Authorization': `Bearer ${accessToken}`}
    })
    .then((response) => {
      // Handle the response if needed
      console.log('Lesson created: ', response.data);
    // After successful save, navigate to lesson page
    navigate("/admin/lessons");
  })
  .catch((error) => {
    // Handle the error if needed
    console.error('Error creating new lesson:', error);
  });
  }
catch{(error)
  // Handle decoding error
  console.error('Error decoding access token:', error);
}}
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Lesson Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Lesson ID"
          type="number"
          variant="outlined"
          fullWidth
          value={lessonId}
          onChange={(e) => setLessonId(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Unit ID"
          type ="number"
          variant="outlined"
          fullWidth
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Lesson Name"
          variant="outlined"
          fullWidth
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Lesson Details"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={lessonDetails}
          onChange={(e) => setLessonDetails(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Lesson Image URL"
          variant="outlined"
          fullWidth
          value={lessonImage}
          onChange={(e) => setLessonImage(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Lesson
        </Button>
      </form>
    </Container>
  );
};

export default LessonForm;
