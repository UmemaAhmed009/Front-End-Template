import { useState, useEffect } from 'react';
import { Grid, Icon, Container, Typography } from '@mui/material'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Iconify from '../components/iconify';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

const unitButtonStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '80px',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  background: 'linear-gradient(to right, #583DDC, #3DA5F1)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
};

const unitButtonHoverStyles = {
  transform: 'scale(1.05)',
};

const handleMouseEnter = (e) => {
  e.target.style.transform = unitButtonHoverStyles.transform;
}; 

const handleMouseLeave = (e) => {
  e.target.style.transform = 'scale(1)';
};

export default function Units() {
  const navigate = useNavigate();
  const { subjectID, classID } = useParams();
  const [units, setUnits] = useState([]);

  
  // const [setSelectedUnit] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);


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
      <Typography variant="h3" sx={{ mb: 5 }}>
      Units for Subject {subjectID} and Class {classID}
        </Typography>

      <Grid container spacing={3}>
        {units.map(unit => (
          <Grid item xs={12} sm={6} md={3} key={unit._id}>
            <button onClick={() => handleSelectUnit(unit.unit_name)} style={{ ...unitButtonStyles }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>{unit.unit_name}
            </button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
  
}
