import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Cookies } from 'react-cookie';
/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Stack,
  Typography,
  Button,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  TablePagination
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

const TABLE_HEAD = [
  { id: '-id', label: 'Lesson ID', alignRight: false },
  { id: 'unitId', label: 'Unit ID', alignRight: false },
  { id: 'lessonName', label: 'Lesson Name', alignRight: false },
  { id: 'lessonDetails', label: 'Lesson Details', alignRight: false },
  { id: 'lessonImageURL', label: 'Lesson Image URL', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true, colSpan: 2 },
];

const YourComponent = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [lessonCount, setLessonCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, lessonCount - page * rowsPerPage);

  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      try {
        console.log("ACCESS TOKEN", accessToken);
        axios
          .get(`http://localhost:3001/lesson`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .then(response => {
            const lessonsData = response.data.lessons;
            const count = response.data.count;
            setLessons(lessonsData);
            // console.log(lessons);
            setLessonCount(count);
            
          })
          .catch(error => {
            console.error('Error fetching lessons', error);
          })
      } catch (error) {
        // Handle decoding error
        console.error('Error decoding access token:', error);
      }
    }
  }, []);

  const handleNewLesson = () => {
    navigate('/admin/lessons/newLesson');
  };

  const handleEdit = (lessonId) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson._id === lessonId ?
          { ...lesson, editable: !lesson.editable } :
          lesson
      )
    );
    setEditingLessonId(lessonId);
  };

  const handleInputChange = (event, lessonId, field) => {
    let value = event.target.value;
    const updatedLessons = lessons.map((lesson) => {
      if (lesson._id === lessonId) {
        return { ...lesson, [field]: value };
      }
      return lesson;
    });
    setLessons(updatedLessons);
  };

  const handleSave = (lesson) => {
    const updatedLessonData = {
      lesson_name: lesson.lesson_name,
      lesson_details: lesson.lesson_details,
      lesson_image: lesson.lesson_image,
    }
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      try {
        console.log("ACCESS TOKEN", accessToken);
        axios.put(`http://localhost:3001/lesson/${lesson._id}`, updatedLessonData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .then((response) => {
            console.log('Lesson data updated: ', response.data);
            setLessons((prevLessons) =>
              prevLessons.map((l) => (l._id === lesson._id ? { ...l, editable: false } : l))
            );
          })
          .catch((error) => {
            console.error('Error updating lesson data:', error);
          });
      } catch (error) {
        console.error('Error decoding access token:', error);
      }
    }
  };

  const handleDelete = (lessonId) => {
    const confirmed = window.confirm('Are you sure you want to delete this lesson?');
    if (confirmed) {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
      axios.delete(`http://localhost:3001/lesson/${lessonId}`,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }})
        .then((response) => {
          console.log('Lesson deleted:', response.data);
          setLessons((prevLessons) => prevLessons.filter((lesson) => lesson._id !== lessonId));
        })
        .catch((error) => {
          console.error('Error deleting lesson:', error);
        });
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Helmet>
        <title>Lessons | Minimal UI</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Lessons
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewLesson}>
            New Lesson
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((lesson) => (
                      <TableRow hover key={lesson._id} tabIndex={-1} role="checkbox" selected={false}>
                        <TableCell align="left">{lesson._id}</TableCell>
                        <TableCell align="left">{lesson.unit_id}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {lesson.editable ? (
                            <Stack direction="row" alignItems="center" spacing={2} >
                              <TextField
                                value={lesson.lessonName}
                                onChange={(event) => handleInputChange(event, lesson._id, 'lessonName')}
                              />
                            </Stack>
                          ) : (
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {lesson.lesson_name}
                              </Typography>
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {lesson.editable ? (
                            <Stack direction="row" alignItems="center" spacing={2} >
                              <TextField
                                multiline

                                value={lesson.lesson_details}
                                onChange={(event) => handleInputChange(event, lesson._id, 'lessonDetails')}
                              />
                            </Stack>
                          ) : (
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {lesson.lesson_details}
                              </Typography>
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {lesson.editable ? (
                            <Stack direction="row" alignItems="center" spacing={2} >
                              <TextField
                                value={lesson.lesson_image}
                                onChange={(event) => handleInputChange(event, lesson._id, 'lessonImageURL')}
                              />
                            </Stack>
                          ) : (
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {lesson.lesson_image}
                              </Typography>
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {lesson.editable && (
                            <Button variant="contained" onClick={() => handleSave(lesson)}>
                              Save
                            </Button>
                          )}
                          {!lesson.editable && (
                            <>
                              <Stack direction="row" alignItems="space-between" spacing={1}>
                                <Button onClick={() => handleEdit(lesson._id)}>
                                  <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                  Edit
                                </Button>
                                <Button onClick={() => handleDelete(lesson._id)} sx={{ color: 'error.main' }}>
                                  <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                                  Delete
                                </Button>
                              </Stack>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={lessonCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
};

export default YourComponent;
