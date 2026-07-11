import app from './app.js';
import dotenv from 'dotenv';

// Load environment variables if present
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AI Evaluator API server running on port ${PORT}`);
});