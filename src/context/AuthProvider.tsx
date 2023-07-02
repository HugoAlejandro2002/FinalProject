import { createContext, useContext, useReducer } from "react";
import authReducer, { initialValues } from "./themeReducers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useReducer(authReducer, initialValues)}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext)[0];

const useAuthDispatch = () => useContext(AuthContext)[1];

export { AuthContext, useAuth, useAuthDispatch };
export default AuthProvider;
