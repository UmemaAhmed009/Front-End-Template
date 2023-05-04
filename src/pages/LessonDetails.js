// // import { Helmet } from 'react-helmet-async';
// // import { faker } from '@faker-js/faker';
// // import axios from 'axios';
// // // @mui
// // import { useTheme } from '@mui/material/styles';
// // import { Grid, Container, Typography } from '@mui/material';
// // import { useNavigate, Link } from 'react-router-dom';
// // // import {button} from React;

// // import { useState, button } from 'react';
// // // components
// // import Iconify from '../components/iconify';

// import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// import axios from 'axios';
// import { useState, button, useEffect } from 'react';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// import { useNavigate, Link, useParams } from 'react-router-dom';
// // components
// import Iconify from '../components/iconify';

// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';
// // import React from 'react';

// export default function LessonDetails() {
//   const navigate = useNavigate();
//   const { subjectID, classID, unitID, lessonID } = useParams();
//   const [lessons, setLessons] = useState([]);

  
//   const [selectedLesson, setSelectedLesson] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/lesson/${lessonID}`)
//       .then((response) => {
//         const { lesson_details, lesson_image } = response.data;
//         setSelectedLesson({
//           lessonDetails: lesson_details,
//           lessonImage: lesson_image,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
  

//   return (
//     <div className="lesson-container">
//       <div className="lesson-image-container">
//         <img src={selectedLesson.lesson_image} alt="Lesson Image" />
//       </div>
//       <div className="lesson-details-container">
//         <p>{selectedLesson.lesson_details}</p>
//       </div>
//     </div>
//   );
  
  
//   }

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

export default function LessonDetails() {
  const navigate = useNavigate();
  const { subjectID, classID, unitID, lessonID } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/lesson/${lessonID}`)
  //     .then((response) => {
  //       const { lesson_details, lesson_image } = response.data;
  //       // console.log(response.data)
  //        setSelectedLesson({
  //         lessonDetails: lesson_details,
  //        lessonImage: lesson_image
  //        });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:3000/lesson/${lessonID}`)
      .then((response) => { 
        console.log(response.data);
        const details = response.data.lesson_details;
        const image  = response.data.lesson_image;
        setSelectedLesson({
          lessonDetails: details,
          lessonImage: image
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="lesson-container">
      {selectedLesson && (
        <>
         <div className="lesson-details-container">
            <p>{selectedLesson.lessonDetails}</p>
          </div>
          <div className="lesson-image-container">
            <img src={selectedLesson.lessonImage} alt="Lesson" />
          </div>
        </>
      )}
    </div>
  );
}

