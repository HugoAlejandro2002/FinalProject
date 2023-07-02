import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { getPracticas } from '../../services/strapiServices';
import { useAuth } from '../../context/AuthProvider';

export const VerPracticas = () => {
  const { loginResponse } = useAuth();
  const [practicas, setPracticas] = useState([]);

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await getPracticas(loginResponse.jwt);
        console.log(response);
        setPracticas(response.data);
      } catch (error) {
        console.error('Error al obtener las prácticas:', error);
      }
    };

    fetchPracticas();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Prácticas creadas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Estudiante</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {practicas.map((practica) => {
              const { id, attributes } = practica;
              const { Titulo, Descripcion, Status, users_permissions_user } = attributes;

              const estudiante = users_permissions_user.data ? users_permissions_user.data.attributes.username : 'Ninguno';

              return (
                <TableRow key={id}>
                  <TableCell>{Titulo}</TableCell>
                  <TableCell>{Descripcion}</TableCell>
                  <TableCell>{Status}</TableCell>
                  <TableCell>{estudiante}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
