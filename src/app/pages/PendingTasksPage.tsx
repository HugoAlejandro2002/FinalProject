import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, TextField, Grid, Box, Container } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTasks, useDispatch } from '../context/TasksProvider';
import { types } from '../context/taskReducers';
import { format } from 'date-fns';

export const PendingTasksPage = () => {
  const {doneTasks, pendingTasks } = useTasks();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (taskInputRef.current) {
        taskInputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  },[]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('pendingTasks');
    if (storedTasks) {
      dispatch({ type: types.loadTasks, tasks: JSON.parse(storedTasks) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  useEffect(() => {
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }, [doneTasks]);

  

  const handleOpenModal = (taskId: string) => {
    setEditTaskId(taskId);
    const task = getTaskById(taskId);
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditTaskId('');
    setTaskTitle('');
    setTaskDescription('');
    setOpenModal(false);
  };

  const handleAddTask = () => {
    dispatch({
      type: types.createTask,
      task: { id: generateId(), title: taskTitle, description: taskDescription },
    });
    handleCloseModal();
  };

  const handleEditTask = () => {
    dispatch({
      type: types.editTask,
      task: { id: editTaskId, title: taskTitle, description: taskDescription },
    });
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: types.deleteTask, taskId });
  };

  const handleMarkTaskDone = (taskId: string) => {
    const task = getTaskById(taskId);
    if (task) {
      const completedDate = format(new Date(), 'dd/MM/yyyy');
      dispatch({ type: 'MARK_TASK_DONE', taskId, completedDate });
    }
  };

  const handleTaskDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    dispatch({
      type: types.reorderTasks,
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

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Aquí puedes realizar la lógica de búsqueda utilizando el valor de 'searchQuery'
    console.log('Realizando búsqueda:', searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container maxWidth="sm" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20vh',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      borderRadius: '8px',
    }}>
      <Typography variant="h5" gutterBottom>
        Solicitar proyectos
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label="Buscar proyecto"
            variant="outlined"
            value={searchQuery}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
