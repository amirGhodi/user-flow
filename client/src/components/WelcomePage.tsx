import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/authService';
import { Link } from 'react-router-dom';
interface User {
  email: string;
  firstName: string;
  lastName: string;
}

const WelcomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome, {user?.firstName} {user?.lastName}!</h1>
      {user && (
        <div className="user-info">
          <p>Email: {user.email}</p>
        </div>
      )}
      <Link to="/reset-password" className="forgot-password-link">Reset Password?</Link>
    </div>
  );
};

export default WelcomePage;
