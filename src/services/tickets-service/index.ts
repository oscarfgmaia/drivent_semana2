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

async function getTickets(id: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollments) {
    throw notFoundError();
  }
  
  const tickets = await ticketsRepository.getTickets();

  if (!tickets) {
    throw notFoundError();
  } else {
    return tickets;
  }
}

async function createTicket() {
  const result = await ticketsRepository.createTicket();
}

const ticketsService = {
  getTypes,
  getTickets,
  createTicket,
};

export default ticketsService;
