import React from 'react';
import { Typography, Button, TextField, Grid, Box, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider';
import { createPractica } from '../../services/strapiServices';

export const RegistrarPracticas = () => {
  const { loginResponse } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createPractica(loginResponse.jwt, {
        Titulo: data.title,
        Descripcion: data.content,
        Status: 'disponible'
      });

      console.log('Práctica creada:', response);
      // Aquí puedes realizar alguna acción adicional después de crear la práctica

      // Limpiar los campos de entrada después de crear la práctica
      reset();
    } catch (error) {
      console.error('Error al crear la práctica:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Crear una práctica
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              {...register('title', { required: true })}
            />
            <TextField
              label="Contenido"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              {...register('content', { required: true })}
            />
            <Button type="submit" variant="contained" color="primary">
              Crear
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
