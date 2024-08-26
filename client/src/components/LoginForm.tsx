import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import loginImage from '../assets/signin.png'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import '../css/LoginForm.css'; 

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/welcome');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
      <div className="login-content-container">
        <div className="login-card">
          <h2 className="login-title">Fill what we know <span>!</span></h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="login-button">Login</button>
              <button type="button" onClick={handleSignUpClick} className="signup-button">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
