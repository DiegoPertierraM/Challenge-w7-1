import { type Singer, type PrismaClient } from '@prisma/client';
import { SingersSqlRepo } from './singers.sql.repo.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { singerCreateDtoSchema } from '../entities/singer.schema.js';

const mockPrisma = {
  singer: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue([{}]),
    create: jest.fn().mockResolvedValue([{}]),
    update: jest.fn().mockResolvedValue([{}]),
    delete: jest.fn().mockResolvedValue([{}]),
  },
} as unknown as PrismaClient;

describe('Given an instance of the class SingersSqlRepo', () => {
  const repo = new SingersSqlRepo(mockPrisma);

  test('Then it should be the instance of the class', () => {
    expect(repo).toBeInstanceOf(SingersSqlRepo);
  });

  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.singer.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid id', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.singer.findUnique).toHaveBeenCalled();
      expect(result).toEqual([{}]);
    });
  });

  describe('When we use the method readById with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.singer.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.readById('10')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Singer 10 not found')
      );
    });
  });

  describe('When we use the method create with a valid object', () => {
    test('Then it should call prisma.create', async () => {
      const result = await repo.create({ name: 'example' } as Singer);
      expect(mockPrisma.singer.create).toHaveBeenCalled();
      expect(result).toEqual([{}]);
    });
  });

  describe('When we use the method create with an invalid object', () => {
    test('Then it should throw an error', async () => {
      const invalidSinger = { band: 'Band', age: 25 } as unknown as Singer;
      await expect(async () => {
        await singerCreateDtoSchema.validateAsync(invalidSinger);
      }).rejects.toThrow('"name" is required');
    });
  });

  describe('When we use the method update', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {});
      expect(mockPrisma.singer.update).toHaveBeenCalled();
      expect(result).toEqual([{}]);
    });
  });

  describe('When we use the method update with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.singer.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.update('10', {})).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Singer 10 not found')
      );
    });
  });

  describe('When we use the method delete with a valid id', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.singer.findUnique).toHaveBeenCalled();
      expect(result).toEqual([{}]);
    });
  });

  describe('When we use the method delete with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.singer.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete('10')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Singer 10 not found')
      );
    });
  });
});
