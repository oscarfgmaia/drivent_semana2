import ticketsService from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTypes();
    res.send(result);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
