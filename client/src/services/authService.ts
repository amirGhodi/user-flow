import api from './api';
import { AxiosError } from 'axios';


export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post('/auth/signup', { firstName, lastName, email, password });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message || 'An error occurred.';
      throw new Error(errorMessage);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};


export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message || 'An error occurred.';
      throw new Error(errorMessage);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};


export const resetPassword = async (currentPassword: string, newPassword: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post(
      '/auth/reset-password',
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message || 'An error occurred.';
      throw new Error(errorMessage);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};


export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message || 'An error occurred.';
      throw new Error(errorMessage);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};


export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message || 'An error occurred.';
      throw new Error(errorMessage);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

