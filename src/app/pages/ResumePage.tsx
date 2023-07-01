import React, { useEffect, useMemo } from 'react';
import { Typography, Container, Box, Grid } from '@mui/material';

import { useTasks, useDispatch } from '../context/TasksProvider';
import { TaskSummary } from '../components/TaskSumary';
import { types } from '../context/taskReducers';



export const ResumePage = () => {
  const { pendingTasks, doneTasks } = useTasks();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = localStorage.getItem('pendingTasks');
    const storedDoneTasks = localStorage.getItem('doneTasks');
    const auth = localStorage.getItem('authenticated');


    if (storedTasks) {
      dispatch({ type: types.loadTasks, tasks: JSON.parse(storedTasks) });

    }
    if (storedDoneTasks) {

      dispatch({ type: types.loadDoneTasks, tasks: JSON.parse(storedDoneTasks) });
    }


  }, []);



  const taskSummary = useMemo(() => {
    const totalTasks = pendingTasks.length + doneTasks.length;
    const completedTasks = doneTasks.length;
    const pendingTasksCount = pendingTasks.length;

    return {
      totalTasks,
      completedTasks,
      pendingTasksCount,
    };
  }, [pendingTasks, doneTasks]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
          Mis practicas
        </Typography>
      {/* <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Resumen de Tareas
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TaskSummary
            totalTasks={taskSummary.totalTasks}
            completedTasks={taskSummary.completedTasks}
            pendingTasks={taskSummary.pendingTasksCount}
          />

        </Grid>
      </Grid> */}
    </Container>
  );
};
