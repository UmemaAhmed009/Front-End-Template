import { useState, useEffect } from 'react';
import { Grid, Icon, Container, Typography } from '@mui/material'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Iconify from '../components/iconify';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

export default function Units() {
  const navigate = useNavigate();
  const { subjectID, classID } = useParams();
  const [units, setUnits] = useState([]);

  
  const [setSelectedUnit] = useState(null);

  const handleSelectUnit = (unitName) => {
    axios.get(`http://localhost:3000/unit/unitName/${unitName}`)
      .then(response => {
        const unitID = response.data;
        setSelectedUnit(unitID);
      navigate(`/subject/${subjectID}/class/${classID}/unit/${unitID}/lessons`);
      
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