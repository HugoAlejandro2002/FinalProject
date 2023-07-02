import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, TextField, Grid, Box, Container } from '@mui/material';
import { useTasks, useDispatch } from '../context/TasksProvider';
import { types } from '../context/taskReducers';

export const AsignarPracticas = () => {
  const {doneTasks, pendingTasks } = useTasks();
  const dispatch = useDispatch();
  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (taskInputRef.current) {
        taskInputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  },[]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('pendingTasks');
    if (storedTasks) {
      dispatch({ type: types.loadTasks, tasks: JSON.parse(storedTasks) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  useEffect(() => {
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }, [doneTasks]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    // Aquí puedes realizar la lógica para crear con los valores de 'title' y 'content'
    console.log('Creando con título:', title);
    console.log('Contenido:', content);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20vh' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Título"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contenido"
            variant="outlined"
            value={content}
            onChange={handleContentChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
