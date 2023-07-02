import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { GuardedRoute, TeacherGuardedRoute } from "../../guards/GuardedRoute";
import { useAuth, useAuthDispatch } from "../../context/AuthProvider";
import AppLayout from "../layout/AppLayout";
import { DoneTasksPage, ResumePage, PendingTasksPage, AsignarPracticas, VerPracticas, RegistrarPracticas } from "../pages";
import TasksProvider from "../context/TasksProvider";
import { useEffect } from "react";
import { types } from "../../context/authReducers";
import { fetchUserInfo } from "../../services/strapiServices";

export const AppRoutes = () => {
  const { auth: isAuthenticated, loginResponse } = useAuth();
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  useEffect( () => {
    const authenticationToken = localStorage.getItem('authenticationToken'); 

    if (!authenticationToken) {
      // Si no hay estado de autenticación, redirigir al inicio de sesión
      navigate('/auth/login')
      
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
              {/* <RegistrarPracticas /> */}
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
        <Route
          path="/registrop"
          element={
            <TeacherGuardedRoute auth={isAuthenticated} role={loginResponse.role}>
              <AppLayout />
              <RegistrarPracticas />
            </TeacherGuardedRoute>
          }
        >
        </Route>
        <Route
          path="/visualizacion"
          element={
            <TeacherGuardedRoute auth={isAuthenticated} role={loginResponse.role}>
              <AppLayout />
              <VerPracticas />
            </TeacherGuardedRoute>
          }
        >
        </Route>
        <Route
          path="/progresopracticas"
          element={
            <TeacherGuardedRoute auth={isAuthenticated} role={loginResponse.role}>
              <AppLayout />
              <AsignarPracticas />
            </TeacherGuardedRoute>
          }
        >
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </TasksProvider>
  );
};
