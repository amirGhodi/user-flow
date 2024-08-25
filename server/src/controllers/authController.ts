import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { sendOtpEmail } from '../services/emailService';

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = Date.now() + 3600000;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpiration,
    });

    await newUser.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({ message: 'Signup successful. Please verify your email.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiration && user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};