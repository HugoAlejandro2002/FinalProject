import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Schedule';

interface TaskSummaryProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({
  totalTasks,
  completedTasks,
  pendingTasks,
}) => {
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <Card variant="outlined" sx={{ borderRadius: 6, backgroundColor: 'background.paper' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <DoneIcon color="primary" />
          <Typography variant="subtitle1" component="p">
            Tareas Completadas: {completedTasks} de {totalTasks}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Stack direction="row" alignItems="center" spacing={2} mt={2}>
          <PendingIcon color="secondary" />
          <Typography variant="subtitle1" component="p">
            Tareas Pendientes: {pendingTasks}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
