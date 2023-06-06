import React, { useState } from 'react';
import { TextField, Button, Box} from '@mui/material';

const CreateSubjectForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState({ id: '', name: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubject((prevSubject) => ({ ...prevSubject, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(subject);
    setSubject({ id: '', name: '' }); // Clear the input fields after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField
          label="Subject ID"
          name="id"
          value={subject.id}
          onChange={handleChange}
          size="small"
          required
          sx={{ marginRight: -25 }}
        />
        <TextField
          label="Subject Name"
          name="name"
          value={subject.name}
          onChange={handleChange}
          size="small"
          required
          sx={{ marginLeft: -1 }}
        />
        <Box marginRight={5}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CreateSubjectForm;
