import React from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { useTasks } from '../context/TasksProvider';

export const DoneTasksPage = () => {
  const { doneTasks } = useTasks();

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Done Tasks
      </Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          {doneTasks.map((task, index) => (
            <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  marginBottom: '1rem',
                  backgroundColor: 'background.default',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    {task.description}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    Completed: {task.completedDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
