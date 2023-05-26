import { useState, useEffect } from 'react';
import { Grid, Icon, Container, Typography } from '@mui/material'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Cookies } from 'react-cookie';
/* eslint-disable */
import jwt_decode from 'jwt-decode';

import Iconify from '../components/iconify';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';



export default function Units() {
  const navigate = useNavigate();
  const { subjectID, classID } = useParams();
  const [units, setUnits] = useState([]);

  const [selectedUnit, setSelectedUnit] = useState(null);

  let unitID=null;
  const cookies = new Cookies();

  const handleSelectUnit = (unitName) => {
    axios.get(`http://localhost:3000/unit/unitName/${unitName}`)
      .then(response => {
        unitID = response.data;
        setSelectedUnit(unitID);
      // navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lessons`);
      
      const accessToken = cookies.get('accessToken');

      if (accessToken) {
        try {
          // Decode the access token to extract user ID
          const decodedToken = jwt_decode(accessToken);
          const userId = decodedToken.userId;
          console.log("USER ID ",userId)

          // Make the POST request with the user ID
          axios.put(`http://localhost:3000/progress/user/${userId}/subject/${subjectID}/class/${classID}/unit`, {
            unit_id: unitID
          })
            .then(response => {
              // Handle the response
              console.log(response.data);
              navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lessons`);
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
        } catch (error) {
          // Handle decoding error
          console.error('Error decoding access token:', error);
        }
      }

      })
      .catch(error => {
        console.error(error);
      });


    }


  useEffect(() => {
    const fetchUnits = async () => {
      const response = await axios.get(`http://localhost:3000/unit/subject/${subjectID}/class/${classID}`);
      setUnits(response.data);
    };
    fetchUnits();
  }, []);


  return (
    <div>
      <h1>Units for Subject {subjectID} and Class {classID}</h1>
      <Grid container spacing={3}>
        {units.map(unit => (
          <Grid item xs={12} sm={6} md={3} key={unit._id}>
            <button onClick={() => handleSelectUnit(unit.unit_name)}>
              <AppWidgetSummary title={unit.unit_name} icon={'ic:outline-child-care'} />
            </button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
  
}
/* <div>
      <h1>Units for Subject {subjectID} and Class {classID}</h1>
      <Grid container spacing={3}>
        {units.map(unit => (
          <Grid item xs={12} sm={6} md={3} key={unit._id}>
            <button onClick={() => handleSelectUnit(unit.unit_name)}>
              <AppWidgetSummary title={unit.unit_name} icon={'ic:outline-child-care'} />
            </button>
          </Grid>
        ))}
      </Grid>
    </div> */