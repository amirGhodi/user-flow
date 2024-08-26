import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import signupImage from '../assets/singup.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    retypePassword: true,
  });
  const [contactMode, setContactMode] = useState('Email');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');
  const [backendError, setBackendError] = useState('');


  const togglePasswordVisibility = (field: 'password' | 'retypePassword') => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };


  const isValidName = (name: string) => {
    return /^[A-Za-z]+$/.test(name);
  };


  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const isValidPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };


  const validateFirstName = () => {
    if (!isValidName(firstName)) {
      setFirstNameError('First name should contain only characters');
    } else {
      setFirstNameError('');
    }
  };


  const validateLastName = () => {
    if (!isValidName(lastName)) {
      setLastNameError('Last name should contain only characters');
    } else {
      setLastNameError('');
    }
  };


  const validateEmail = () => {
    if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };


  const validatePassword = () => {
    if (!isValidPassword(password)) {
      setPasswordError('Password should contain at least 8 char with 1 uppercase, 1 lowercase, 1 number, and 1 special character');
    } else {
      setPasswordError('');
    }
  };


  const validateRetypePassword = () => {
    if (password !== retypePassword) {
      setRetypePasswordError('Passwords do not match');
    } else {
      setRetypePasswordError('');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validateRetypePassword();


    if (firstNameError || lastNameError || emailError || passwordError || retypePasswordError) {
      return;
    }


    try {
      await signup(firstName, lastName, email, password);
      navigate('/otp-verification', { state: { email } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setBackendError(error.message);
      } else {
        setBackendError('An unknown error occurred.');
      }
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={signupImage} alt="Signup" />
      </div>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-heading-container">
            <h2 className="signup-heading">Let us know <span>!</span></h2>
            <a href="/login" className="signin-link">Sign In</a>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={validateFirstName}
              className={firstNameError ? 'error-input' : ''}
              required
            />
            {firstNameError && <p className="error-message">{firstNameError}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={validateLastName}
              className={lastNameError ? 'error-input' : ''}
              required
            />
            {lastNameError && <p className="error-message">{lastNameError}</p>}
          </div>
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showPassword.password ? 'text' : 'password'}
                id="password"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                className={passwordError ? 'error-input' : ''}
                required
              />
              <span
                onClick={() => togglePasswordVisibility('password')}
                className="password-toggle-icon"
              >
                {showPassword.password ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showPassword.retypePassword ? 'text' : 'password'}
                id="retypePassword"
                placeholder="Retype Password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                onBlur={validateRetypePassword}
                className={retypePasswordError ? 'error-input' : ''}
                required
              />
              <span
                onClick={() => togglePasswordVisibility('retypePassword')}
                className="password-toggle-icon"
              >
                {showPassword.retypePassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {retypePasswordError && <p className="error-message">{retypePasswordError}</p>}
          </div>
          <div className="form-group">
            <select
              id="contactMode"
              value={contactMode}
              onChange={(e) => setContactMode(e.target.value)}
              required
            >
              <option value="Email">Email</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              className={emailError ? 'error-input' : ''}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          {backendError && <p className="error-message">{backendError}</p>}
          <div className="form-actions">
            <button type="submit" className="signup-button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default SignupForm;