import express from 'express';
import path from 'path';
import cors from 'cors';
import app from './app';

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, './uploads'))); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
