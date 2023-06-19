import { createContext, useContext, useReducer } from "react";
import tasksReducer, { initialValues } from './taskReducers'

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  return (
    <TasksContext.Provider value={useReducer(tasksReducer, initialValues)}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => useContext(TasksContext)[0];

const useDispatch = () => useContext(TasksContext)[1];

export { TasksContext, useTasks, useDispatch };

export default TasksProvider
