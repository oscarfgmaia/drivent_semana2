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

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      enrollmentId,
      ticketTypeId,
    },
  });
}

async function getTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  const ticketType = (await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  })) as TicketType;
  return ticketType;
}

const ticketsRepository = {
  getTypes,
  getTickets,
  createTicket,
  getTicketTypeById,
};

export default ticketsRepository;
