import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import ThemeProvider from "./context/ThemeProvider";
import AuthProvider from "./context/AuthProvider";



function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppTheme>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AppTheme>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
