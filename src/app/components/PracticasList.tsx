import React from 'react';
import { Typography, Button, Box } from '@mui/material';

interface Practica {
  id: number;
  attributes: {
    Titulo: string;
    Descripcion: string;
    Status: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface PracticasListProps {
  practicas: Practica[];
  onPostular: (practica: Practica) => void;
}

const PracticasList: React.FC<PracticasListProps> = ({ practicas, onPostular }) => {
  return (
    <div>
      {practicas.map((practica) => (
        <Box key={practica.id} mt={2} p={2} border={1} borderRadius={4}>
          <Typography variant="subtitle1">{practica.attributes.Titulo}</Typography>
          <Typography variant="body2">{practica.attributes.Descripcion}</Typography>
          <Typography variant="body2">Fecha de publicación: {practica.attributes.publishedAt}</Typography>
          <Button variant="contained" color="primary" onClick={() => onPostular(practica)}>
            Postular
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default PracticasList;
