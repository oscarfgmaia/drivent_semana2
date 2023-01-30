import { CreateTicket } from '@/services/tickets-service';
import Joi from 'joi';

export const ticket = Joi.object<CreateTicket>({
  ticketTypeId: Joi.number().required(),
});
