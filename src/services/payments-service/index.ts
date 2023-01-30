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

async function createPayment() {}

const paymentsService = {
  getPayment,
  createPayment,
};

export default paymentsService;
