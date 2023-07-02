import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Button } from '@mui/material';
import { getPracticas, createPostulacion } from '../../services/strapiServices';
import { useAuth } from "../../context/AuthProvider";
import PracticasList from '../components/PracticasList';

export const PendingTasksPage = () => {
  const { loginResponse } = useAuth();
  const [practicas, setPracticas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await getPracticas(loginResponse.jwt);
        const practicasDisponibles = response.data.filter(practica => practica.attributes.Status === "disponible");
        setPracticas(practicasDisponibles);
      } catch (error) {
        console.error('Error al obtener las prácticas:', error);
      }
    };

    fetchPracticas();
  }, [loginResponse.jwt]);

  const handleSearch = () => {
    console.log('Realizando búsqueda:', searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePostular = async (practica) => {
    try {
      const response = await createPostulacion(loginResponse.jwt, practica.id, loginResponse.id);
      console.log('Postulación creada:', response.data);
    } catch (error) {
      console.error('Error al crear la postulación:', error);
    }
  };


  return (
    <Container maxWidth="sm" style={{/* Estilos */ }}>
      <Typography variant="h5" gutterBottom>
        Solicitar proyectos
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label="Buscar proyecto"
            variant="outlined"
            value={searchQuery}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Grid>
      </Grid>
      <PracticasList practicas={practicas} onPostular={handlePostular} />
    </Container>
  );
};
