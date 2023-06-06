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
  { id: '-id', label: 'Subject ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: '' },
  { id: 'actions', label: 'Actions', alignRight:true, colSpan:2},
];

const YourComponent = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [subjectCount, setSubjectCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(null);
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, subjectCount - page * rowsPerPage);

  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if(accessToken){
    try{
    console.log("ACCESS TOKEN", accessToken);
    axios
      .get(`http://localhost:3000/subject`,{headers: {
        'Authorization': `Bearer ${accessToken}`}
      })
      .then(response => {
        const subjectsData = response.data.subjects;
        const count = response.data.count;
        setSubjects(subjectsData);
        setSubjectCount(count);
        console.log("HI");
      })
      .catch(error => {
        console.error('Error fetching subjects', error);
      })
    }
    catch{(error)
    // Handle decoding error
    console.error('Error decoding access token:', error);
    }};
  }, []);
  //Creating New user
  const handleNewSubject = () => {
    navigate('/admin/subjects/newSubject'); // Replace '/signup' with the appropriate path to your signup page
  };
  //Editing User
  const handleEdit = (subjectId) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject)=>
        subject._id === subjectId ? 
        { ...subject, editable: !subject.editable } : subject));
         setEditingSubjectId(subjectId);
  };
  //Editing within the table
  const handleInputChange = (event, subjectId, field) => {
    let value = event.target.value;
    // Convert the role_id to a number
//   if (field === 'role_id') {
//     value = parseInt(value, 10);
//   }
    const updatedSubjects = subjects.map((subject) => {
      if (subject._id === subjectId) {
        return { ...subject, [field]: value };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
  };
  //Saving updated user in the backend 
  const handleSave = (subject) => {
    // Prepare the updated user data to send to the backend
    const updatedSubjectData = {
      subject_name: subject.subject_name,
    }
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if(accessToken){
    try{
    console.log("ACCESS TOKEN", accessToken);
    // Make the API request to update the user's data
    axios.put(`http://localhost:3000/subject/${subject._id}`, updatedSubjectData, {
      headers: {
      'Authorization': `Bearer ${accessToken}`}
    })
    .then((response) => {
      // Handle the response if needed
      console.log('Subject data updated: ', response.data);
  
    // After successful save, update the edit mode flag
    setSubjects((prevSubjects) =>
      prevSubjects.map((s) => (s._id === subject._id ? { ...s, editable: false } : s))
    );
  })
  .catch((error) => {
    // Handle the error if needed
    console.error('Error updating subject data:', error);
  });
  }
catch{(error)
  // Handle decoding error
  console.error('Error decoding access token:', error);
}

}};

const handleDelete = (subjectId) => {
  const confirmed = window.confirm('Are you sure you want to delete this subject?');
  if (confirmed) {
    // Make the API request to delete the subject
    axios.delete(`http://localhost:3000/subject/${subjectId}`, { headers: {
    'Authorization': `Bearer ${accessToken}`}
    })
      .then((response) => {
        // Handle the response if needed
        console.log('Subject deleted:', response.data);
        // Remove the deleted subject from the state
        setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== subjectId));
      })
      .catch((error) => {
        // Handle the error if needed
        console.error('Error deleting subject:', error);
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
        <title>Subjects | Minimal UI</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Subjects
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}  onClick={handleNewSubject}>
            New Subject
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox checked={false} onChange={() => {}} /> */}
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subject) => (
                <TableRow hover key={subject._id} tabIndex={-1} role="checkbox" selected={false}>
                <TableCell padding="checkbox">
                    {/* <Checkbox checked={false} onChange={() => {}} /> */}
                </TableCell>
            
            <TableCell align="left">{subject._id}</TableCell>
        
            <TableCell component="th" scope="row" padding="none">
                {subject.editable ? (
                <Stack direction="row" alignItems="center" spacing={2} >
                    <TextField
                    value={subject.subject_name}
                    onChange={(event) => handleInputChange(event, subject._id, 'name')}
                    />
                </Stack>
                ) : (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                    {subject.subject_name}
                    </Typography>
                </Stack>
                )}
            </TableCell>
            <TableCell align="right"></TableCell> {/* Empty cell for spacing */}
            <TableCell align="right" ></TableCell> {/* Empty cell for spacing */}
            <TableCell align="right"></TableCell> {/* Empty cell for spacing */}
            <TableCell align="right">
                {subject.editable && (
                <Button variant="contained" onClick={() => handleSave(subject)}>
                    Save
                </Button>
                )}
                { !subject.editable && (
                <>
                {/* <TableCell align="right"> */}
                <Stack direction="row" alignItems="space-between" spacing={1} marginRight={-28}>
                        <Button onClick={() => handleEdit(subject._id)}>
                        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                        Edit
                        </Button>
                        <Button onClick={() => handleDelete(subject._id)} sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }}/>
                            Delete
                        </Button>
                </Stack>
                {/* </TableCell> */}
                </>)}
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
                rowsPerPageOptions={[3, 5, 7]}
                component="div"
                count={subjectCount}
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


    
    