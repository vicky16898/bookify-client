import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

export default function MyBookings() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>
        <Typography color="text.secondary">
          Here you can see all your bookings.
        </Typography>
        {/* Add booking list component here */}
      </Paper>
    </Container>
  );
} 