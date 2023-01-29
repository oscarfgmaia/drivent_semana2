import { prisma } from '@/config';
import { Ticket, TicketType } from '@prisma/client';

async function getTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getTickets(): Promise<Ticket[]> {
  return await prisma.ticket.findMany();
}

async function createTicket() {
  
}


const ticketsRepository = {
  getTypes,
  getTickets,
  createTicket
};

export default ticketsRepository;
