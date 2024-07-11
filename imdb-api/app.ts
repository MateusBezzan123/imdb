import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user';
import movieRoutes from './src/routes/movie';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

export default app;
