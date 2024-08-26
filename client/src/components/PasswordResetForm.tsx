import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const ResetPasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }
    try {
      await resetPassword(currentPassword, newPassword);
      setSuccess(true);
    } catch (error: unknown) {
      console.log("errtt", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };


  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };


  if (success) {
    return (
      <div className="success-message">
        <p>Password reset successful. You can now login with your new password.</p>
        <Link to="/login" className="form-button">Go to Login</Link>
      </div>
    );
  }


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showPassword.current ? 'text' : 'password'}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your current password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPassword.current ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showPassword.new ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter new password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPassword.new ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Confirm new password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="form-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};


export default ResetPasswordForm;
