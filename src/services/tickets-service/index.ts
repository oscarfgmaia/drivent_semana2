import { notFoundError } from '@/errors';
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
  const result = await ticketsRepository.getTickets();
  if (!result) {
    throw notFoundError();
  } else {
    return result;
  }
}

async function createTicket() {
  const result = await ticketsRepository.createTicket();
}

const ticketsService = {
  getTypes,
  getTickets,
  createTicket
};

export default ticketsService;
