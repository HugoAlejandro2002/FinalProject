import React, { useState } from 'react';
import { Typography, Button, TextField, Grid, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTasks, useDispatch } from '../context/TasksProvider';
import { TaskModal } from '../components/TaskModal';
import { PendingTaskCard } from '../components/PendingTaskCard';

export const PendingTasksPage = () => {
  const { pendingTasks } = useTasks();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (taskId: string) => {
    setEditTaskId(taskId);
    setTaskTitle(getTaskById(taskId).title);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditTaskId('');
    setTaskTitle('');
    setOpenModal(false);
  };

  const handleAddTask = () => {
    dispatch({
      type: 'CREATE_TASK',
      task: { id: generateId(), title: taskTitle, status: 'pending' },
    });
    handleCloseModal();
  };

  const handleEditTask = () => {
    dispatch({
      type: 'EDIT_TASK',
      task: { id: editTaskId, title: taskTitle, status: 'pending' },
    });
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', taskId });
  };

  const handleMarkTaskDone = (taskId: string) => {
    const task = getTaskById(taskId);
    if (task) {
      dispatch({ type: 'MARK_TASK_DONE', taskId });
    }
  };

  const handleTaskDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return; // No se produjo una acción de soltar o no hubo cambios en la posición
    }

    dispatch({
      type: 'REORDER_TASKS',
      sourceIndex: source.index,
      destinationIndex: destination.index,
      isDoneList: false,
    });
  };

  const getTaskById = (taskId: string) => {
    return pendingTasks.find((task) => task.id === taskId);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const getFilteredTasks = () => {
    if (searchTerm.trim() === '') {
      return pendingTasks;
    } else {
      return pendingTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Pending Tasks
      </Typography>
      <Box mb={2}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <DragDropContext onDragEnd={handleTaskDragEnd}>
        <Droppable droppableId="pendingTasks">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {getFilteredTasks().map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <Box
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      mb={2}
                      component={Grid}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <PendingTaskCard
                        task={task}
                        provided={provided}
                        handleOpenModal={handleOpenModal}
                        handleDeleteTask={handleDeleteTask}
                        handleMarkTaskDone={handleMarkTaskDone}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Add Task
      </Button>
      <TaskModal
        open={openModal}
        editTaskId={editTaskId}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        handleCloseModal={handleCloseModal}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
      />
    </Box>
  );
};
