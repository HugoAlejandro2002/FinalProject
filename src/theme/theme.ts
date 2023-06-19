import { createTheme } from '@mui/material';
import { useTheme } from '../context/ThemeProvider';

const theme = () => {
  const {palette} = useTheme();
  console.log(palette)
  return createTheme({
    palette
  });
};

export default theme;
