import { createContext, useContext, useReducer } from "react";
import themeReducer, { initialValues } from "./themeReducers";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={useReducer(themeReducer, initialValues)}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext)[0];

const useDispatch = () => useContext(ThemeContext)[1];

export { ThemeContext, useTheme, useDispatch };
export default ThemeProvider;
