import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import GoogleIcon from '@mui/icons-material/Google';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
   const { user, handleGoogleSignIn } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   console.log(location);

   const googleSignInHandler = () => {
      handleGoogleSignIn(location, navigate);
   };

   console.log(user);

   return (
      <Container>
         <Box sx={{width: '50%', minWidth: '250px', bgcolor: '#f4f5f8', mx: 'auto', mt: 5, p: 5, borderRadius: 2}}>
             <Typography variant="h4" textAlign='center'>Sign In To Continue</Typography>
            <Button variant='contained' onClick={googleSignInHandler} sx={{mx: 'auto', display: "flex", mt: 5}}>
               {' '}
               <GoogleIcon sx={{mr: 1}} /> Sign in with google
            </Button>
         </Box>
      </Container>
   );
};

export default SignIn;
