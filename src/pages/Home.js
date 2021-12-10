import {
   Alert,
   Avatar,
   Button,
   Container,
   Grid,
   IconButton,
   Input,
   Paper,
   TextField,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import useUserProfile from '../hooks/useUserProfile';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const Home = () => {
   const { user } = useAuth();
   const [userProfile, loading, error] = useUserProfile(user?.email);

   const [name, setName] = useState(userProfile.displayName);
   const [image, setImage] = useState('');
   const [previewImage, setPreviewImage] = useState('');
   const [profileUpdated, setProfileUpdated] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (name.trim().length === 0 || !image) return;

      // creating form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('email', user.email);

      // updating user profile
      const { data } = await axios.put(
         'https://solruf-backend.herokuapp.com/updateProfile',
         formData
      );

      if (data.modifiedCount) {
         setProfileUpdated(true);
         setTimeout(() => {
            setProfileUpdated(false);
         }, 2000);

         window.location.reload();
      }
   };

   const changeHandler = (e) => {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
   };

   return (
      <Container>
         <Header />
         <Box>
            {profileUpdated && (
               <Alert variant='filled' severity='success' sx={{ mb: 2 }}>
                  Profile Updated Successfully!
               </Alert>
            )}
            <Grid container spacing={3}>
               <Grid item xs={12} lg={4}>
                  <Paper sx={{ py: 5, px: 3, textAlign: 'center' }}>
                     {loading ? (
                        <Avatar
                           alt='User'
                           src=''
                           sx={{ width: 86, height: 86, mx: 'auto' }}
                        />
                     ) : (
                        <Avatar
                           alt='User'
                           src={
                              userProfile.photoUrl?.includes('http')
                                 ? userProfile.photoUrl
                                 : `data:image/jpeg;base64,${userProfile.photoUrl}`
                           }
                           sx={{ width: 86, height: 86, mx: 'auto' }}
                        />
                     )}

                     <Typography
                        variant='h5'
                        sx={{ fontWeight: 'bold', mt: 2 }}
                     >
                        {userProfile.displayName}
                     </Typography>
                     <Typography variant='body1' sx={{ color: 'gray' }}>
                        {userProfile.email}
                     </Typography>
                  </Paper>
               </Grid>
               <Grid item xs={12} lg={8}>
                  <Paper
                     sx={{
                        py: 5,
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                     }}
                     component='form'
                     onSubmit={handleSubmit}
                     encType='multipart/form-data'
                  >
                     <label
                        htmlFor='icon-button-file'
                        style={{ marginLeft: '' }}
                     >
                        <Avatar
                           alt='Remy Sharp'
                           src={previewImage}
                           sx={{
                              width: 150,
                              height: 150,
                              cursor: 'pointer',
                              '&:hover': {
                                 backgroundColor: '#eee',
                              },
                           }}
                           title='Click Change Profile Picture'
                        />
                        <Input
                           accept='image/*'
                           id='icon-button-file'
                           type='file'
                           sx={{ display: 'none' }}
                           onChange={changeHandler}
                        />
                        <IconButton
                           color='primary'
                           aria-label='upload picture'
                           component='span'
                        >
                           {/* <PhotoCamera /> */}
                        </IconButton>
                     </label>

                     <TextField
                        required
                        variant='outlined'
                        label='Update User Name'
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        sx={{}}
                     />
                     <Button type='submit' variant='contained' sx={{ mt: 2.5 }}>
                        Update
                     </Button>
                  </Paper>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
};

export default Home;
