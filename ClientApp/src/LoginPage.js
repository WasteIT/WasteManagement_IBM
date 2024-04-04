import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function LoginPage() {
  const navigate = useNavigate();

  const handleNavigateToAgreements = () => {
    // Navigate to the Agreements page
    navigate('/Signup');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleNavigateToAgreements}>hello</button>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default LoginPage;
