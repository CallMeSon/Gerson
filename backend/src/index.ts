import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRouter from './routes/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so frontend (usually port 5173 for Vite) can call our backend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/projects', projectRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Gerson Portfolio API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
