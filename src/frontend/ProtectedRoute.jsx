import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../services/profileService.js'

function ProtectedRoute({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    isLoggedIn()
    .then(data => {
      setLoggedIn(data);
    })
  }, []);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;