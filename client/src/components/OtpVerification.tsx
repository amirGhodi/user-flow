import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../services/authService';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp.join(''));
      navigate('/welcome');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Enter OTP</h2>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            maxLength={1}
            required
            className="otp-input"
          />
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-button">Verify OTP</button>
    </form>
    </div>
    </div>
  );
};

export default OtpVerification;
