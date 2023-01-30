import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const id = parseInt(ticketId);
  if (isNaN(id)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result = await paymentsService.getPayment(id, req.userId);
    res.status(httpStatus.OK).send(result);


  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (e.name === 'ConflictError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await paymentsService.createPayment();
    res.send(result);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
