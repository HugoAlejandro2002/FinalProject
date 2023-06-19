const types = {
  createTask: "CREATE_TASK",
  editTask: "EDIT_TASK",
  deleteTask: "DELETE_TASK",
  reorderTasks: "REORDER_TASKS",
  markTaskDone: "MARK_TASK_DONE",
};

const initialValues = {
  pendingTasks: [],
  doneTasks: [],
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case types.createTask:
      return {
        ...state,
        pendingTasks: [...state.pendingTasks, action.task],
      };
    case types.editTask:
      return {
        ...state,
        pendingTasks: state.pendingTasks.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
      };
    case types.deleteTask:
      return {
        ...state,
        pendingTasks: state.pendingTasks.filter(
          (task) => task.id !== action.taskId
        ),
        doneTasks: state.doneTasks.filter((task) => task.id !== action.taskId),
      };
    case types.reorderTasks:
      const { sourceIndex, destinationIndex, isDoneList } = action;
      const tasks = isDoneList ? state.doneTasks : state.pendingTasks;
      const reorderedTasks = Array.from(tasks);
      const [removed] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, removed);

      return isDoneList
        ? { ...state, doneTasks: reorderedTasks }
        : { ...state, pendingTasks: reorderedTasks };
    case types.markTaskDone:
      const task = state.pendingTasks.find((t) => t.id === action.taskId);
      if (task) {
        return {
          ...state,
          pendingTasks: state.pendingTasks.filter((t) => t.id !== action.taskId),
          doneTasks: [...state.doneTasks, task],
        };
      }
      break;

    default:
      return state;
  }
};

export { initialValues, types };
export default tasksReducer;
