import axios from 'axios';
import { useEffect, useState } from 'react';

const useUserProfile = (email) => {
   const [userProfile, setUserProfile] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
      axios
         .get(`http://localhost:5000/getUserProfile/${email}`)
         .then(({ data }) => {
            setUserProfile(data);
            setLoading(false);
            setError('');
         })
         .catch((err) => {
            setError(err);
            setLoading(false);
         });
   }, [email]);

   return [userProfile, loading, error];
};

export default useUserProfile;