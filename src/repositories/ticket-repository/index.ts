import { prisma } from '@/config';
import { TicketType } from '@prisma/client';

async function getTypes():Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

const ticketsRepository = {
  getTypes,
};

export default ticketsRepository;
