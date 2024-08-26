import express from 'express';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
const dotenv = require('dotenv');
dotenv.config();

export const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;