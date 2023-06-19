import { createTheme } from '@mui/material';
import { useTheme } from '../context/ThemeProvider';

const theme = () => {
  const {palette} = useTheme();
  return createTheme({
    palette
  });
};

export default theme;
