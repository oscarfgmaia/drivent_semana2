import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/ticket-repository';

async function getTypes() {
  const result = await ticketsRepository.getTypes();
  if (!result) {
    throw notFoundError();
  } else {
    return result;
  }
}

async function getTickets() {
  const tickets = await ticketsRepository.getTickets();

  if (!tickets) {
    throw notFoundError();
  } else {
    return tickets;
  }
}
async function userHasEnrollment(id: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) {
    throw notFoundError();
  } else {
    return enrollment;
  }
}
export type CreateTicket = {
  ticketTypeId: number;
};
async function createTicket(ticketTypeId: number) {
  const result = await ticketsRepository.createTicket(ticketTypeId);
  return result;
}

const ticketsService = {
  getTypes,
  getTickets,
  createTicket,
  userHasEnrollment,
};

export default ticketsService;
