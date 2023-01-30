import ticketsService from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { number } from 'joi';
import { TicketStatus, TicketType } from '@prisma/client';

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

export type userIdWithTicketTypeId = {
  ticketTypeId: number;
  userId: number;
  status: TicketStatus;
};

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const userIdWithTicketTypeId = {
    ticketTypeId: req.body.ticketTypeId as number,
    userId: req.userId,
  } as userIdWithTicketTypeId;
  try {
    const ticketCreated = await ticketsService.createTicket(userIdWithTicketTypeId);
    res.status(httpStatus.CREATED).send(ticketCreated);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
