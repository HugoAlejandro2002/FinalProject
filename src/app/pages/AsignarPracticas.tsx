import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Container, Grid, Box, Button } from '@mui/material';
import { getAllPostulaciones, updatePractica, deletePostulacion } from '../../services/strapiServices';
import { useAuth } from "../../context/AuthProvider";

export const AsignarPracticas = () => {
  const { loginResponse } = useAuth();
  const [postulaciones, setPostulaciones] = useState([]);

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const response = await getAllPostulaciones(loginResponse.jwt);
        setPostulaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las postulaciones:', error);
      }
    };

    fetchPostulaciones();
  }, []);

  const handleAcceptPostulacion = async (postulacionId) => {
    try {
      const token = loginResponse.jwt;

      // Obtener la postulación correspondiente
      const postulacion = postulaciones.find(p => p.id === postulacionId);
      if (!postulacion) {
        console.error('No se encontró la postulación');
        return;
      }

      // Obtener los datos necesarios para actualizar el proyecto
      const { practica, users_permissions_user } = postulacion.attributes;
      const proyectoId = practica.data.id;
      const usuarioId = users_permissions_user.data.id;

      // Actualizar el proyecto en la base de datos
      await updatePractica(token, proyectoId, usuarioId);

      // Eliminar la postulación de la base de datos
      await deletePostulacion(token, postulacionId);

      console.log('Postulación aceptada');
      // Actualizar la lista de postulaciones o realizar alguna acción adicional
    } catch (error) {
      console.error('Error al aceptar la postulación:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {postulaciones.length > 0 ? 'Postulaciones de estudiantes' : 'Hoy no hay postulaciones'}
      </Typography>
      <Grid container spacing={2}>
        {postulaciones.map((postulacion) => {
          const { id, attributes } = postulacion;
          const { practica, users_permissions_user } = attributes;

          return (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{practica.data.attributes.Titulo}</Typography>
                  <Typography variant="body2">{practica.data.attributes.Descripcion}</Typography>
                  <Typography variant="body2">Postulado por: {users_permissions_user.data.attributes.username}</Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAcceptPostulacion(id)}
                    >
                      Aceptar postulación
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
