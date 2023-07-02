import { TextField, Button, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import AuthLayout from '../layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../../context/AuthProvider';
import { types } from '../../context/authReducers';
import { useEffect, useState } from 'react';
import { fetchUserInfo, loginUser } from '../../services/strapiServices';

export const LoginPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      const userInfo = await fetchUserInfo(response.jwt);
      const { role, id} = userInfo;

      dispatch({ type: types.login, payload: { jwt: response.jwt, role: role.name,id } });
      localStorage.setItem('authenticationToken', response.jwt);

      navigate('/home');
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  useEffect(() => {
    const authenticationToken = localStorage.getItem('authenticationToken');
    if (authenticationToken) {
      const fetchUserPermission = async () => {
        try {
          const userInfo = await fetchUserInfo(authenticationToken);
          const { role } = userInfo;
          
          dispatch({ type: types.login, payload: { jwt: authenticationToken, role: role.name, id } });
          navigate('/home');
        } catch (error) {
          // Manejar el error al obtener la información del usuario
          console.log('Error al obtener la información del usuario:', error);
        }
      };

      fetchUserPermission();
    }
  }, []);

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
              helperText={errors.email ? 'Email Requerido' : ''}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              {...register('password', { required: true })}
              error={errors.password}
              helperText={errors.password ? 'Contraseña requerida' : ''}
              margin="normal"
              fullWidth
            />
            {error && <div className="alert">{error}</div>}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={errors.email || errors.password}
            >
              Iniciar sesión
            </Button>
          </form>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
