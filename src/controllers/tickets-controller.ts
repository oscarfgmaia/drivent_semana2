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

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    await ticketsService.userHasEnrollment(req.userId);
    const result = await ticketsService.getTickets();
    if (result.length === 0) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.send(result[0]);
    }
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body;
  try {
    await ticketsService.userHasEnrollment(req.userId);
    const result = await ticketsService.createTicket(ticketTypeId);
    res.send(result);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
