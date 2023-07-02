import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Container, Grid, Box } from '@mui/material';
import { getAllPracticasByUser } from '../../services/strapiServices';
import { useAuth } from '../../context/AuthProvider';

export const DoneTasksPage = () => {
  const [completedPracticas, setCompletedPracticas] = useState([]);
  const [pendingPracticas, setPendingPracticas] = useState([]);
  const { loginResponse } = useAuth();

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await getAllPracticasByUser(loginResponse.jwt, loginResponse.id);
        const completed = response.filter(practica => practica.attributes.Status === 'acabada');
        const pending = response.filter(practica => practica.attributes.Status !== 'acabada');
        setCompletedPracticas(completed);
        setPendingPracticas(pending);
      } catch (error) {
        console.error('Error al obtener las prácticas:', error);
      }
    };

    fetchPracticas();
  }, [loginResponse.jwt, loginResponse.id]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Resumen de mis proyectos
      </Typography>
      {completedPracticas.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Proyectos completados
          </Typography>
          <Grid container spacing={2}>
            {completedPracticas.map(practica => {
              const { id, attributes } = practica;
              const { Titulo, Descripcion } = attributes;
              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{Titulo}</Typography>
                      <Typography variant="body2">{Descripcion}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
      {pendingPracticas.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Proyectos pendientes
          </Typography>
          <Grid container spacing={2}>
            {pendingPracticas.map(practica => {
              const { id, attributes } = practica;
              const { Titulo, Descripcion } = attributes;
              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{Titulo}</Typography>
                      <Typography variant="body2">{Descripcion}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Container>
  );
};
