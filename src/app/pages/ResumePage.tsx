import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Grid, Button } from '@mui/material';

import { useAuth } from '../../context/AuthProvider';
import { getPracticasByUser, finalizarPractica } from '../../services/strapiServices';

export const ResumePage = () => {
  const { loginResponse } = useAuth();
  const [practicas, setPracticas] = useState([]);

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await getPracticasByUser(loginResponse.jwt, loginResponse.id);
        setPracticas(response);
      } catch (error) {
        console.error('Error al obtener las prácticas:', error);
      }
    };

    fetchPracticas();
  }, []);

  const handleFinalizarPractica = async (practicaId) => {
    try {
      const token = loginResponse.jwt;

      // Finalizar la práctica en la base de datos
      await finalizarPractica(token, practicaId);

      // Actualizar la lista de prácticas o realizar alguna acción adicional
      const updatedPracticas = practicas.filter((practica) => practica.id !== practicaId);
      setPracticas(updatedPracticas);

      console.log('Práctica finalizada');
    } catch (error) {
      console.error('Error al finalizar la práctica:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Mis prácticas finalizadas
      </Typography>
      {practicas.length > 0 ? (
        <Grid container spacing={2}>
          {practicas.map((practica) => {
            const {id} = practica
            const { Titulo, Descripcion } = practica.attributes;
      

            return (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Box boxShadow={2} p={2}>
                  <Typography variant="h6">{Titulo}</Typography>
                  <Typography variant="body2">{Descripcion}</Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleFinalizarPractica(id)}
                    >
                      Finalizar práctica
                    </Button>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body1">
          No tienes prácticas finalizadas en este momento.
        </Typography>
      )}
    </Container>
  );
};