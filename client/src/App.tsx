import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PasswordResetForm from './components/PasswordResetForm';
import WelcomePage from './components/WelcomePage';
import SignupForm from './components/SignupForm';
import OtpVerification from './components/OtpVerification';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
      </Routes>
    </Router>
  );
};

export default App;

