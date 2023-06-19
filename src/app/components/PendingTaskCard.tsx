import React from 'react';
import { Card, CardContent, Typography, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

interface PendingTaskCardProps {
  task: { id: string; title: string };
  provided: any;
  handleOpenModal: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  handleMarkTaskDone: (taskId: string) => void;
}

export const PendingTaskCard: React.FC<PendingTaskCardProps> = ({
  task,
  provided,
  handleOpenModal,
  handleDeleteTask,
  handleMarkTaskDone,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card key={task.id} variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">{task.title}</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => handleOpenModal(task.id)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleMarkTaskDone(task.id)} color="success">
                <DoneIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

