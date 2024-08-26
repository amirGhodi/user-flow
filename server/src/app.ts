import express from 'express';
const dotenv = require('dotenv');
import cors from 'cors';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
dotenv.config();

export const app = express();

app.use(express.json());

const frontEndURL = process.env.REACT_FRONTEND_URL ? process.env.REACT_FRONTEND_URL : 'http://localhost:3000'

console.log('process.env.REACT_FRONTEND_URL:', frontEndURL);

app.use(cors({
    origin: frontEndURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']

}));

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;