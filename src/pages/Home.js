import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const { user } = useAuth();
   return (
      <Container>
         <Header />
         <Box>
            <h1>Welcome {user.displayName}</h1>
         </Box>
      </Container>
   );
};

export default Home;
