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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
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
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your current password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter new password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="form-group password-group">
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Confirm new password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
