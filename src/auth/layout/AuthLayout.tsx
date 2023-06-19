import { Grid, Box, Button } from "@mui/material";
import { useDispatch, useTheme } from '../../context/ThemeProvider';
import { types } from '../../context/themeReducers';

const AuthLayout = ({ children }) => {
  
  const dispatch = useDispatch();
  const {isLight} = useTheme();

  const toggleTheme = () => {
    dispatch({ type: isLight  ? types.dark : types.light });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "secondary.main", padding: 4 }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 8,
          backgroundColor: "background.default",
          padding: 4,
        }}
      >
        {children}
      </Box>
      <Button variant="contained" onClick={toggleTheme} sx={{ mt: 2 }}>
        Cambiar tema
      </Button>
    </Grid>
  );
};

export default AuthLayout;

