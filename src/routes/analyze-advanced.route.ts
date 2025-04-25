import { Router } from 'express';
import analyzeController from '../controllers/analyze-advanced.controller';
const router = Router();

router.post('/', analyzeController.analyze);
export default router;