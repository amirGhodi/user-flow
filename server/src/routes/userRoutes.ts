import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getUserProfile } from '../controllers/userController';

export const userRoutes = express.Router();
userRoutes.get('/me', authenticate, getUserProfile);