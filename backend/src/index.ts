import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import projectRouter from './routes/projects.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so frontend (usually port 5173 for Vite) can call our backend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../assets/uploads')));

// Routes
app.use('/api/projects', projectRouter);
app.use('/api/upload', uploadRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Gerson Portfolio API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

