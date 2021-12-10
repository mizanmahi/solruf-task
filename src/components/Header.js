import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
   const { logoutUser } = useAuth();

   const handleLogout = () => {
      logoutUser();
   };

   return (
      <div>
         <Button variant='outlined' onClick={handleLogout}>
            Logout
         </Button>
      </div>
   );
};

export default Header;
