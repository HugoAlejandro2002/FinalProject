import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const DoneTaskCard = ({ task }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {task.title}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, marginBottom: 1 }}>
          {task.description}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
          Completed: {task.completedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};
