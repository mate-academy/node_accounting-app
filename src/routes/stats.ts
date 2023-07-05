import { Router } from 'express';
import statsController from '../controllers/stats';

export const router = Router();

router.get('/', statsController.getStats);
