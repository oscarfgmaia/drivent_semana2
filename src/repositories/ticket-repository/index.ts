import { prisma } from '@/config';
import { Enrollment, Ticket, TicketType } from '@prisma/client';
export type TicketWithEnrollment = Ticket & {
  Enrollment: Enrollment;
};
export type TicketWithTicketType = Ticket & {
  TicketType: TicketType;
};

async function getTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getTickets(): Promise<TicketWithTicketType[]> {
  return await prisma.ticket.findMany({
    include: {
      TicketType: true,
    },
  });
}

async function createTicket() {}

const ticketsRepository = {
  getTypes,
  getTickets,
  createTicket,
};

export default ticketsRepository;
