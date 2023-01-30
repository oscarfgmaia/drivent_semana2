import { Router } from 'express';
import { getTypes, getTickets, createTicket } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticket } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .get('/', authenticateToken, getTickets)
  .post('/', authenticateToken, validateBody(ticket), createTicket)
  .get('/types', authenticateToken, getTypes);

export { ticketsRouter };
