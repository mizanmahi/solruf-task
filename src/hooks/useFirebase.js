import { useEffect, useState } from 'react';
import {
   getAuth,
   createUserWithEmailAndPassword,
   updateProfile,
   signInWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
   onAuthStateChanged,
   signOut,
} from 'firebase/auth';
import initializeFirebase from '../firebase/firebase.config';

initializeFirebase();

const useFirebase = () => {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const [userLoading, setUserLoading] = useState(true);

   const auth = getAuth();
   const googleProvider = new GoogleAuthProvider();

   const handleGoogleSignIn = (location, navigate) => {
      signInWithPopup(auth, googleProvider)
         .then((result) => {
            const { user } = result;
            setUser(user);
            setUserLoading(false);
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

   return {
      user,
      userLoading,
      error,
      handleGoogleSignIn,
      logoutUser,
   };
};

export default useFirebase;
