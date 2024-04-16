import { PrismaClient } from '@prisma/client';
import createDebug from 'debug';

const debug = createDebug('W7E:db.connect');
export const dbConnect = async () => {
  debug('Connecting to database');
  const prisma = new PrismaClient();
  return prisma;
};
