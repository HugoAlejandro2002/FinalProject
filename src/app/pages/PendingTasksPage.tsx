import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, TextField, Grid, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTasks, useDispatch } from '../context/TasksProvider';
import { TaskModal } from '../components/TaskModal';
import { PendingTaskCard } from '../components/PendingTaskCard';
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box p={2} minHeight="100vh" display="flex" flexDirection="column">
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
          inputRef={taskInputRef}
        />
      </Box>
      <Box flexGrow={1} overflow="auto">
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
      </Box>
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        sx={{ mt: 2, alignSelf: 'flex-end' }}
      >
        Add Task
      </Button>
      <TaskModal
        open={openModal}
        editTaskId={editTaskId}
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        setTaskTitle={setTaskTitle}
        setTaskDescription={setTaskDescription}
        handleCloseModal={handleCloseModal}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
      />
    </Box>
  );
};
