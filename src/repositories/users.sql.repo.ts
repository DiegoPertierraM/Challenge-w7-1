import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type User, type UserCreateDto } from '../entities/user.js';
import { type Repo } from './type.repo.js';
const debug = createDebug('W7E:users:repository:sql');

const select = {
  id: true,
  name: true,
  email: true,
  birthDate: true,
  role: true,
  songs: {
    select: {
      id: true,
      title: true,
      author: true,
      year: true,
    },
  },
};

export class UsersSqlRepo
  implements Repo<Omit<User, 'password'>, UserCreateDto>
{
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated users sql repository');
  }

  async readAll() {
    return this.prisma.user.findMany({
      select,
    });
  }

  async readById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return user;
  }

  async create(data: UserCreateDto) {
    const { birthDateString, ...rest } = data;

    const newUser = this.prisma.user.create({
      data: {
        role: 'user',
        birthDate: new Date(birthDateString),
        ...rest,
      },
      select,
    });

    return newUser;
  }

  async update(id: string, data: Partial<UserCreateDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
      select,
    });
  }
}
