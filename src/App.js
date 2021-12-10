import './App.css';
import AuthContextProvider from './context/AuthContextProvider';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
   return (
      <BrowserRouter>
         <AuthContextProvider>
            <div className='App'>
               <Routes>
                  <Route
                     path='/'
                     element={
                        <ProtectedRoute>
                           <Home />
                        </ProtectedRoute>
                     }
                  />
                  <Route path='/signin' element={<SignIn />} />
               </Routes>
            </div>
         </AuthContextProvider>
      </BrowserRouter>
   );
}

export default App;
