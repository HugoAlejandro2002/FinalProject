import { Navigate, Route, Routes } from "react-router-dom";

import { GuardedRoute } from "../../guards/GuardedRoute";
import { useTheme } from "../../context/ThemeProvider";
import AppLayout from "../layout/AppLayout";
import { DoneTasksPage, ResumePage, PendingTasksPage } from "../pages";
import TasksProvider from "../context/TasksProvider";

export const AppRoutes = () => {
  const { auth: isAuthenticated } = useTheme();

  return (
    <TasksProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <GuardedRoute auth={isAuthenticated}>
              <AppLayout />
              <ResumePage />
            </GuardedRoute>
          }
        >
        </Route>
        <Route
          path="/done"
          element={
            <GuardedRoute auth={isAuthenticated}>
              <AppLayout />
              <DoneTasksPage />
            </GuardedRoute>
          }
        >
        </Route>
        <Route
          path="/pending"
          element={
            <GuardedRoute auth={isAuthenticated}>
              <AppLayout />
              <PendingTasksPage />
            </GuardedRoute>
          }
        >
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </TasksProvider>
  );
};
