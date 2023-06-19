import React from 'react';
import { Card, CardContent, Typography, IconButton, Stack, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

interface PendingTaskCardProps {
  task: { id: string; title: string; description: string };
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
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Card key={task.id} variant="outlined" sx={{ mb: 2, borderRadius: 4, '&:hover': { backgroundColor: '#f9fbe7' } }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description}
              </Typography>
            </Box>
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
