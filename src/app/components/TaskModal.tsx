import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface TaskModalProps {
  open: boolean;
  editTaskId: string;
  taskTitle: string;
  taskDescription: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  handleCloseModal: () => void;
  handleAddTask: () => void;
  handleEditTask: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  editTaskId,
  taskTitle,
  taskDescription,
  setTaskTitle,
  setTaskDescription,
  handleCloseModal,
  handleAddTask,
  handleEditTask,
}) => {
  const [taskDate, setTaskDate] = useState('');

  const handleMarkTaskDone = () => {
    setTaskDate(new Date().toLocaleDateString());
    handleEditTask();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}
      >
        <Typography variant="h6">{editTaskId ? 'Edit Task' : 'Add Task'}</Typography>
        <TextField
          label="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
        />
        {editTaskId ? (
          <Button onClick={handleEditTask} variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        ) : (
          <Button onClick={handleAddTask} variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        )}
        {editTaskId && (
          <Button onClick={handleMarkTaskDone} variant="contained" color="success" sx={{ mt: 2 }}>
            Mark as Done
          </Button>
        )}
        {taskDate && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Completed on: {taskDate}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};
