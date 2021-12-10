import { Avatar, Box, Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useUserProfile from '../hooks/useUserProfile';

const Header = () => {
   const { logoutUser } = useAuth();
   const { user } = useAuth();

   const handleLogout = () => {
      logoutUser();
   };

   const [userProfile, loading, error] = useUserProfile(user?.email);

   console.log(userProfile);

   return (
      <Box
         sx={{
            bgcolor: '#f4f5f8',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
         }}
      >
         {loading ? (
            <Avatar
               alt='User'
               src=''
               sx={{ width: 56, height: 56 }}
            />
         ) : (
            <Avatar
               alt='User'
               src={
                  userProfile.photoUrl?.includes('http')
                     ? userProfile.photoUrl
                     : `data:image/jpeg;base64,${userProfile.photoUrl}`
               }
               sx={{ width: 56, height: 56 }}
            />
         )}

         <Button variant='outlined' onClick={handleLogout}>
            Logout
         </Button>
      </Box>
   );
};

export default Header;
