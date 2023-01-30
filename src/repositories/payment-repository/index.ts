import { prisma } from '@/config';
import { PaymentData } from '@/controllers';
import { Ticket, TicketType } from '@prisma/client';

async function getPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
async function createPayment(data: PaymentData,price:number) {
  let fourLast = data.cardData.number.toString()
  fourLast = fourLast[11]+fourLast[12]+fourLast[13]+fourLast[14]
  return await prisma.payment.create({
    data:{
      ticketId:data.ticketId,
      value:price,
      cardIssuer:data.cardData.issuer,
      cardLastDigits:fourLast
    }
  })
}

const paymentsRepository = {
  getPayment,
  createPayment,
};

export default paymentsRepository;
