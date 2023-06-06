import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import {
    Container,
    Typography,
    TextField,
    Button,
    Box
  } from '@mui/material';

const CreateSubjectForm = () => {
  const navigate = useNavigate;
  const [subject, setSubject] = useState({ id: '', name: '' });
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubject((prevSubject) => ({ ...prevSubject, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // set configurations
    const subjectData = {
        subject_id : subjectId,
        subject_name : subjectName,
    }
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
        const decodedToken = jwt_decode(accessToken);
        if(accessToken){
        try{
        const subjectId = decodedToken.subjectId;
        console.log("ACCESS TOKEN", accessToken);
        console.log(subjectData);
        // Make the API request to update the user's data
        axios.post(`http://localhost:3000/subject`, subjectData, {
          headers: {
          'Authorization': `Bearer ${accessToken}`}
        })
        .then((response) => {
          // Handle the response if needed
          console.log('Subject created: ', response.data);
        // After successful save, navigate to lesson page
        navigate("/admin/subjects");
      })
      .catch((error) => {
        // Handle the error if needed
        console.error('Error creating new subject:', error);
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
            Subject Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Subject ID"
              type="number"
              variant="outlined"
              fullWidth
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Subject Name"
              variant="outlined"
              fullWidth
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Subject
            </Button>
          </form>
        </Container>
      );
    };
    
export default CreateSubjectForm;
