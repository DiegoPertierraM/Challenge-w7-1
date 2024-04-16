import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type SingerCreateDto } from '../entities/singer';
import { type PrismaClient } from '@prisma/client';
import { type SingersRepo } from './singers.type.repo.js';
const debug = createDebug('W7E:singers:repository:sql');

const select = {
  id: true,
  name: true,
  band: true,
  age: true,
};

export class SingersSqlRepo implements SingersRepo {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated singer sql repository');
  }

  async readAll() {
    return this.prisma.singer.findMany();
  }

  async readById(id: string) {
    const singer = await this.prisma.singer.findUnique({
      where: { id },
      select: { id: true, name: true, band: true, age: true },
    });

    if (!singer) {
      throw new HttpError(404, 'Not Found', `Singer ${id} not found`);
    }

    return singer;
  }

  async create(data: SingerCreateDto) {
    return this.prisma.singer.create({
      data,
      select: { name: true, band: true, age: true },
    });
  }

  async update(id: string, data: Partial<SingerCreateDto>) {
    const singer = await this.prisma.singer.findUnique({
      where: { id },
      select,
    });
    if (!singer) {
      throw new HttpError(404, 'Not Found', `Singer ${id} not found`);
    }

    return this.prisma.singer.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const singer = await this.prisma.singer.findUnique({
      where: { id },
      select,
    });
    if (!singer) {
      throw new HttpError(404, 'Not Found', `Singer ${id} not found`);
    }

    return this.prisma.singer.delete({
      where: { id },
      select,
    });
  }
}
