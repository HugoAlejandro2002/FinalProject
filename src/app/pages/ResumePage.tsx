import React from 'react';
import { Typography, Container, Box, Grid } from '@mui/material';
import {TaskSummary} from '../components/TaskSumary';


export const ResumePage = () => {
  const totalTasks = 10;
  const completedTasks = 7;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <Container maxWidth="md">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Resumen de Tareas
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TaskSummary
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

