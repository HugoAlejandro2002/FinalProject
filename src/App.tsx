import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import ThemeProvider from "./context/ThemeProvider";



function App() {
  return (
    <ThemeProvider>
      <AppTheme>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppTheme>
    </ThemeProvider>
  );
}

export default App;
