import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import MoodLogger from './components/MoodLogger';
import MoodHistory from './components/MoodHistory';
import MoodChart from './components/MoodChart';
import Welcome from './components/Welcome';
import ProtectedRoute from './components/ProtectedRoute';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import { useEffect, useState } from 'react';

const App = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

         
          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mood-logger" element={<MoodLogger />} />
            <Route path="/mood-history" element={<MoodHistory />} />
            <Route path="/mood-chart" element={<MoodChart />} />
          </Route>

         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

