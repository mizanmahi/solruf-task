import { useEffect, useState } from 'react';
import {
   getAuth,
   updateProfile,
   signInWithPopup,
   GoogleAuthProvider,
   onAuthStateChanged,
   signOut,
} from 'firebase/auth';
import initializeFirebase from '../firebase/firebase.config';
import axios from 'axios';

initializeFirebase();

const useFirebase = () => {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const [userLoading, setUserLoading] = useState(true);

   const auth = getAuth();
   const googleProvider = new GoogleAuthProvider();

   const handleGoogleSignIn = (location, navigate) => {
      signInWithPopup(auth, googleProvider)
         .then(async (result) => {
            const { user } = result;
            setUser(user);
            setUserLoading(false);

            await saveUserProfile(user.displayName, user.email, user.photoURL);

            location?.state?.from
               ? navigate(location.state.from.pathname)
               : navigate('/');
         })
         .catch((error) => {
            setError(error);
            setUserLoading(false);
         });
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
         } else {
            setUser(null);
         }
         setUserLoading(false);
      });

      return unsubscribe;
   }, [auth]);

   //@ LOGOUT USER
   const logoutUser = () => {
      signOut(auth).then(() => {
         console.log('User Logged Out');
      });
   };

   // save user profile to db
   const saveUserProfile = async (displayName, email, photoUrl) => {
      const { data } = await axios.post(
         'https://solruf-backend.herokuapp.com/saveUserProfile',
         {
            displayName,
            email,
            photoUrl,
         }
      );
      console.log(data);
   };

   return {
      user,
      userLoading,
      error,
      handleGoogleSignIn,
      logoutUser,
   };
};

export default useFirebase;
