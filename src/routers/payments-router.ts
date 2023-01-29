import { Router } from 'express';
import { getPayments, createPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.get('/', authenticateToken, getPayments).post('/process', authenticateToken, createPayment);

export { ticketsRouter };
