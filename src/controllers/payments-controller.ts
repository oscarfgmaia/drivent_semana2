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
export type PaymentData = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};
export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const paymentData = req.body as PaymentData;

  if (!paymentData.cardData || !paymentData.ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const result = await paymentsService.createPayment(paymentData, req.userId);
    if (!result) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
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
