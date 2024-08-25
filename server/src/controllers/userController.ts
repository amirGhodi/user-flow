import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};