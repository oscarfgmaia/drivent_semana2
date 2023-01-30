import { notFoundError, conflictError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/ticket-repository';

async function getPayment(ticketId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const payment = await paymentsRepository.getPayment(ticketId);
  if (enrollment.id === ticket.enrollmentId && enrollment.userId === userId) {
    return payment;
  } else {
    throw conflictError("This ticket doensn't belongs to you");
  }
}

import { PaymentData } from '@/controllers';

async function createPayment(data: PaymentData, userId: number) {
  const ticket = await ticketsRepository.getTicketById(data.ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticketType = await ticketsRepository.getTicketTypeById(ticket.ticketTypeId);
  if (enrollment.id === ticket.enrollmentId && enrollment.userId === userId) {
    await ticketsRepository.updateStatusToPaid(data.ticketId);
    const response = await paymentsRepository.createPayment(data, ticketType.price);
    return response;
  } else {
    throw conflictError("This ticket doensn't belongs to you");
  }
}

const paymentsService = {
  getPayment,
  createPayment,
};

export default paymentsService;
