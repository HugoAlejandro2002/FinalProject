import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface TaskModalProps {
  open: boolean;
  editTaskId: string;
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  handleCloseModal: () => void;
  handleAddTask: () => void;
  handleEditTask: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  editTaskId,
  taskTitle,
  setTaskTitle,
  handleCloseModal,
  handleAddTask,
  handleEditTask,
}) => {
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
        {editTaskId ? (
          <Button onClick={handleEditTask} variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        ) : (
          <Button onClick={handleAddTask} variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        )}
      </Box>
    </Modal>
  );
};


