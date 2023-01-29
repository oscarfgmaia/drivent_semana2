import { prisma } from '@/config';
import { Ticket, TicketType } from '@prisma/client';

async function getPayments(){

}
async function createPayment(){

}

const paymentsRepository = {
  getPayments,
  createPayment,
};

export default paymentsRepository;
