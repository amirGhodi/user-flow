import express from 'express';
import { signup, login, verifyOtp } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
import { resetPassword } from '../controllers/authController';
export const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.post('/reset-password', authenticate, resetPassword);
authRoutes.post('/verify-otp', verifyOtp);