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

const ticketsService = {
  getTypes,
};

export default ticketsService;
