import { userIdWithTicketTypeId } from '@/controllers';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/ticket-repository';
import { TicketWithTicketType } from '@/repositories/ticket-repository';

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
async function createTicket(obj: userIdWithTicketTypeId) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(obj.userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticketType = await ticketsRepository.getTicketTypeById(obj.ticketTypeId);
  if (!ticketType) {
    throw notFoundError();
  }
  const ticketCreated = await ticketsRepository.createTicket(obj.ticketTypeId, enrollment.id);

  const ticketWithTicketType = {
    TicketType: { ...ticketType },
    ...ticketCreated,
  };
  return ticketWithTicketType;
}

const ticketsService = {
  getTypes,
  getTickets,
  createTicket,
  userHasEnrollment,
};

export default ticketsService;
