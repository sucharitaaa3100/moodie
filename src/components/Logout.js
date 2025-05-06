
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import {Link} from 'react-router-dom';
import { app } from '../firebase';

const Logout = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);
        navigate('/'); 
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logoutUser();
  }, [auth, navigate]);

  return (<>
  <Link to="/dashboard">
        <button className="btn btn-primary">Go to Dashboard</button>
      </Link>
  <div>Logging out...</div></>
);
};

export default Logout;

