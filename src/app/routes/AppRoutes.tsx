import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { GuardedRoute } from "../../guards/GuardedRoute";
import { useTheme, useDispatch } from "../../context/ThemeProvider";
import AppLayout from "../layout/AppLayout";
import { DoneTasksPage, ResumePage, PendingTasksPage } from "../pages";
import TasksProvider from "../context/TasksProvider";
import { useEffect } from "react";
import { types } from "../../context/themeReducers";

export const AppRoutes = () => {
  const { auth: isAuthenticated } = useTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect( () => {
    const authenticated = localStorage.getItem('authenticated'); 

    if (!authenticated) {
      // Si no hay estado de autenticación, redirigir al inicio de sesión
      navigate('/auth/login')
      
    }
    if(authenticated==='true'){
      dispatch({type: types.login}) 
    }
  }, []); 



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
