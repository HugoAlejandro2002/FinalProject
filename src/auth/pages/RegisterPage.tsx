import { TextField, Button, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import AuthLayout from "../layout/AuthLayout";
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Aquí puedes realizar la lógica de registro con los datos ingresados
    console.log(data);
  };

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
            Registro
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

            <TextField
              label="Repetir Contraseña"
              variant="outlined"
              type="password"
              {...register('confirmPassword', { required: true })}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword ? 'Campo requerido' : ''}
              margin="normal"
              fullWidth
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Crear cuenta
            </Button>
          </form>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textPrimary">
            ¿Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>
          </Typography>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
