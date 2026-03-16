import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import propertiesRoutes from './routes/properties';
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/properties', propertiesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
