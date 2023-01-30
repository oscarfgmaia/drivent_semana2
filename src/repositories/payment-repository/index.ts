import { prisma } from '@/config';
import { Ticket, TicketType } from '@prisma/client';

async function getPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
async function createPayment() {}

const paymentsRepository = {
  getPayment,
  createPayment,
};

export default paymentsRepository;
