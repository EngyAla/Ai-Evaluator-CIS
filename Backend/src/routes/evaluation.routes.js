import { Router } from 'express';
import { evaluate as evaluateSingle } from '../controllers/evaluation.controller.js';
import { evaluate as evaluateBatch } from '../controllers/batch-evaluation.controller.js';

const router = Router();

// Route configuration
router.post('/evaluate', evaluateSingle);
router.post('/evaluate/batch', evaluateBatch);

export default router;
