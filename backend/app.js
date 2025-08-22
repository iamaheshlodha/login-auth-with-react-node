import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './app/config/db.js';
import setupRoutes from './app/routes/index.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => res.json({ message: 'Welcome to Events', error: false }));
setupRoutes(app);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
