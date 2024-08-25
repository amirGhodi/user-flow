import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiration?: number;
  isVerified: boolean;
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiration: { type: Number },
  isVerified: { type: Boolean, default: false },
});

export const User = mongoose.model<IUser>('User', userSchema);