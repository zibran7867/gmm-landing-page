import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Progress = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent : 'center', alignItems : 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}

export default Progress
