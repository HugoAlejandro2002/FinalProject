import { TextField, Button, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import AuthLayout from "../layout/AuthLayout";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../context/ThemeProvider';
import { types } from '../../context/themeReducers';
import { useEffect } from 'react';


export const LoginPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = (data) => {
    dispatch({ type: types.login })
    localStorage.setItem('authenticated', 'true');
    navigate('/home')
  };

  useEffect(() => {
    const isAuthed = localStorage.getItem('authenticated');
    if (isAuthed === 'true') {
      dispatch({ type: types.login })
      navigate('/home')

    }
  }, [])

  return (
    <AuthLayout>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h5" component="h1" color="textPrimary" gutterBottom>
            Iniciar sesión
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              {...register('email', { required: true })}
              error={errors.email}
              helperText={errors.email ? 'Campo requerido' : ''}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              {...register('password', { required: true })}
              error={errors.password}
              helperText={errors.password ? 'Campo requerido' : ''}
              margin="normal"
              fullWidth
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Iniciar sesión
            </Button>
          </form>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textPrimary">
            ¿No tienes una cuenta? <Link to="/auth/register">Regístrate</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            fullWidth
            onClick={() => {
              // Aquí puedes implementar la lógica de inicio de sesión con Google
            }}
          >
            Iniciar sesión con Google
          </Button>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
