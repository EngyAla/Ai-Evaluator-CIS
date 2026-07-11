import express from 'express';
import evaluationRoutes from '../routes/evaluation.routes.js';

const app = express();

// Standard middleware
app.use(express.json());

// Mount API routes
app.use('/api', evaluationRoutes);

// Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;