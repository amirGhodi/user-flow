import express from 'express';
const dotenv = require('dotenv');
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import cors from 'cors';
dotenv.config();

export const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.REACT_FRONTEND_URL || 'http://localhost:3000'
}));

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;