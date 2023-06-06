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
  Checkbox,
  IconButton,
  TextField,
  Paper,
  Popover,
  MenuItem,
  TablePagination
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

const TABLE_HEAD = [
  { id: '-id', label: 'USER ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'password', label: 'Password', alignRight: false },
  { id: 'role_id', label: 'ROLE ID', alignRight: false },
  { id: '' },
];

const YourComponent = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userCount - page * rowsPerPage);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user`) 
      .then(response => {
        const usersData = response.data.docs;
        const count = response.data.count;
        setUsers(usersData);
        console.log("HI");
        setUserCount(count);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  //Creating New user
  const handleNewUser = () => {
    navigate('/signUp'); // Replace '/signup' with the appropriate path to your signup page
  };
  //Editing User
  const handleEdit = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user)=>
        user._id === userId ? 
        { ...user, editable: !user.editable } : user));
         setEditingUserId(userId);
  };
  //Editing within the table
  const handleInputChange = (event, userId, field) => {
    let value = event.target.value;
    // Convert the role_id to a number
  if (field === 'role_id') {
    value = parseInt(value, 10);
  }
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, [field]: value };
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  //Saving updated user in the backend 
  const handleSave = (user) => {
    // Prepare the updated user data to send to the backend
    const updatedUserData = {
      name: user.name,
      email: user.email,
      age: user.age,
      role_id: user.role_id
    }
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if(accessToken){
    try{
    console.log("ACCESS TOKEN", accessToken);
    // Make the API request to update the user's data
    axios.put(`http://localhost:3000/user/${user._id}`, updatedUserData, {
      headers: {
      'Authorization': `Bearer ${accessToken}`}
    })
    .then((response) => {
      // Handle the response if needed
      console.log('User data updated: ', response.data);
  
    // After successful save, update the edit mode flag
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === user._id ? { ...u, editable: false } : u))
    );
  })
  .catch((error) => {
    // Handle the error if needed
    console.error('Error updating user data:', error);
  });
  }
catch{(error)
  // Handle decoding error
  console.error('Error decoding access token:', error);
}

}};

const handleDelete = (userId) => {
  const confirmed = window.confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    // Make the API request to delete the user
    axios.delete(`http://localhost:3000/user/${userId}`)
      .then((response) => {
        // Handle the response if needed
        console.log('User deleted:', response.data);
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        // Handle the error if needed
        console.error('Error deleting user:', error);
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
        <title>User | Minimal UI</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}  onClick={handleNewUser}>
            New User
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
                <TableCell>Email</TableCell>
                <TableCell>Role ID</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
                <TableBody>
                  {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow hover key={user._id} tabIndex={-1} role="checkbox" selected={false}>
                      <TableCell padding="checkbox">
                        {/* <Checkbox checked={false} onChange={() => {}} /> */}
                      </TableCell>

                      <TableCell align="left">{user._id}</TableCell>

                      <TableCell component="th" scope="row" padding="none">
                      {user.editable ? (
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <TextField
                            value={user.name}
                            onChange={(event) => handleInputChange(event, user._id, 'name')}
                          />
                        </Stack>
                        ) : (
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {user.name}
                          </Typography>
                        </Stack> )}
                      </TableCell>

                      <TableCell align="left">
                      {user.editable ? (
                            <TextField
                              value={user.email}
                              onChange={(event) => handleInputChange(event, user._id, 'email')}
                            />
                          ) : (
                        user.email )}</TableCell>

                      <TableCell align="left">
                      {user.editable ? (
                            <TextField
                              type ="number"
                              value={user.role_id}
                              onChange={(event) => handleInputChange(event, user._id, 'role_id')}
                            />
                          ) : (
                            user.role_id
                          )}</TableCell>

                      <TableCell align="left">
                      {user.editable ? (
                            <TextField
                              type ="number"
                              value={user.age}
                              onChange={(event) => handleInputChange(event, user._id, 'age')}
                            />
                          ) : (
                            user.age
                          )}</TableCell>

                          <TableCell align="right">
                              {user.editable && (
                                <Button variant="contained" onClick={() => handleSave(user)}>
                                  Save
                                </Button>
                              )}
                              { !user.editable && (
                                <>
                                  <MenuItem>
                                  <Button onClick={() => handleEdit(user._id)}><Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />Edit</Button>
                                
                              </MenuItem>

                              <MenuItem sx={{ color: 'error.main' }}>
                                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} onClick={(e) => handleDelete(e)} />
                                Delete
                              </MenuItem>
                              </> )}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userCount}
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

