import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await paymentsService.getPayments();
    res.send(result);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
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

