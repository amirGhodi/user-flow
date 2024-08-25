import express from 'express';
import { authRoutes } from './routes/authRoutes';
const dotenv = require('dotenv');
dotenv.config();

export const app = express();

app.use(express.json());


app.get('/hello', (req, res) => {
  res.send('Hello from the backend server!');
});

app.use('/api/auth', authRoutes);