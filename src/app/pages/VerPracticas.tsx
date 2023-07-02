import { useEffect } from 'react';
import { Typography, Card, CardContent, Container, Grid, Box } from '@mui/material';
import { useDispatch, useTasks } from '../context/TasksProvider';
import { types } from '../context/taskReducers';

export const VerPracticas = () => {
  const { doneTasks } = useTasks();
  const dispatch = useDispatch()

  useEffect(() => {
    const storedTasks = localStorage.getItem('doneTasks');
    if (storedTasks) {
      dispatch({ type: types.loadDoneTasks, tasks: JSON.parse(storedTasks) });
    }
    
  }, []);



  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
          Practicas creadas
        </Typography>
    </Container>
  );
};
