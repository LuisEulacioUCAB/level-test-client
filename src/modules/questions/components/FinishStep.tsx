import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const FinishStep: React.FC = () => {
  return (
    <Box
      minHeight={300}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Typography variant="h4">¿Deseas finalizar el test?</Typography>
    </Box>
  );
};
