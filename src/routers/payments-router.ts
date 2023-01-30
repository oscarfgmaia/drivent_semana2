import { Router } from 'express';
import { getPayment, createPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();
//uthenticateToken, createPayment
paymentsRouter
.get('', authenticateToken, getPayment)
.post('/process', authenticateToken, createPayment);

export { paymentsRouter };
