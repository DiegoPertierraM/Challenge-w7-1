import { type Response, type Request } from 'express';
import { type SongsSqlRepo } from '../repositories/songs.sql.repo';
import { SongsController } from './songs.controller';
import { HttpError } from '../middleware/errors.middleware';

describe('Given an instance of the class songsController', () => {
  const repo = {
    // ReadAll: jest.fn(),
    // readById: jest.fn(),
    // create: jest.fn(),
    // update: jest.fn(),
    // delete: jest.fn(),
  } as unknown as SongsSqlRepo;

  // Const req = {} as unknown as Request;
  // const res = {
  //   json: jest.fn(),
  //   status: jest.fn(),
  // } as unknown as Response;
  // const next = jest.fn();

  // const controller = new SongsController(repo);
  // test('Then it should be instance of the class', () => {
  //   expect(controller).toBeInstanceOf(SongsController);
  // });

  // Describe('When we use the method getAll', () => {
  //   test('Then it should call repo.readAll', async () => {
  //     (repo.readAll as jest.Mock).mockResolvedValue([]);
  //     await controller.getAll(req, res, next);
  //     expect(repo.readAll).toHaveBeenCalled();
  //     expect(res.json).toHaveBeenCalledWith([]);
  //   });
  // });

  // describe('When we use the method getAll and the repo throws an ERROR', () => {
  //   test('Then it should call repo.readAll and next', async () => {
  //     const error = new Error('Something went wrong');
  //     (repo.readAll as jest.Mock).mockRejectedValue(error);
  //     await controller.getAll(req, res, next);
  //     expect(repo.readAll).toHaveBeenCalled();
  //     expect(res.json).toHaveBeenCalledWith([]);
  //   });
  // });

  // describe('When we use the method getById', () => {
  //   test('Then it should call repo.readById', async () => {
  //     req.params = { id: '1' };
  //     (repo.readById as jest.Mock).mockResolvedValue({});
  //     await controller.getById(req, res, next);
  //     expect(repo.readById).toHaveBeenCalledWith(req.params.id);
  //     expect(res.json).toHaveBeenCalledWith({});
  //   });
  // });

  // describe('When we use the method getById and the repo throws an ERROR', () => {
  //   test('Then it should call repo.readById and next', async () => {
  //     const error = new Error('Something went wrong');
  //     req.params = { id: '2' };
  //     (repo.readById as jest.Mock).mockRejectedValue(error);
  //     await controller.getById(req, res, next);
  //     expect(repo.readById).toHaveBeenCalledWith(req.params.id);
  //     expect(next).toHaveBeenCalledWith(error);
  //   });
  // });

  // describe('When we use the method create', () => {
  //   test('Then it should call repo.create', async () => {
  //     const song = { title: 'x', author: 'y', year: 1000 };
  //     const validateSong = song;
  //     req.body = song;
  //     (repo.create as jest.Mock).mockResolvedValue(song);
  //     await controller.create(req, res, next);
  //     expect(repo.create).toHaveBeenCalledWith(validateSong);
  //     expect(res.status).toHaveBeenCalledWith(201);
  //     expect(res.json).toHaveBeenCalledWith(song);
  //   });
  // });

  // describe('When we use the method create and the repo throws an ERROR', () => {
  //   test('Then it should call repo.create and next', async () => {
  //     const song = { title: 'x', author: 'y' };
  //     req.body = song;
  //     await controller.create(req, res, next);
  //     expect(next).toHaveBeenCalledWith(
  //       new HttpError(406, 'Not Acceptable', '"year" is required')
  //     );
  //   });
  // });

  // describe('When we use the method create and the repo throws an ERROR', () => {
  //   test('Then it should call repo.create and next', async () => {
  //     const error = new Error('Something went wrong');
  //     req.body = { title: 'x', author: 'y', year: 1000 };
  //     (repo.create as jest.Mock).mockRejectedValue(error);
  //     await controller.create(req, res, next);
  //     expect(repo.create).toHaveBeenCalledWith(req.body);
  //     expect(next).toHaveBeenCalledWith(error);
  //   });
  // });

  // describe('When we use the method update', () => {
  //   test('Then it should call repo.update', async () => {
  //     const song = { title: 'x', author: 'y' };
  //     req.params = { id: '1' };
  //     req.body = song;
  //     (repo.update as jest.Mock).mockResolvedValue(song);
  //     await controller.update(req, res, next);
  //     expect(repo.update).toHaveBeenCalledWith('1', song);
  //     expect(res.json).toHaveBeenCalledWith(song);
  //   });
  // });

  // describe('When we use the method update with INVALID data', () => {
  //   test('Then it should call next with an error', async () => {
  //     const song = { author: 34 };
  //     req.body = song;
  //     await controller.update(req, res, next);
  //     expect(next).toHaveBeenCalledWith(
  //       new HttpError(406, 'Not Acceptable', '"author" must be a string')
  //     );
  //   });
  // });

  // describe('When we use the method update and repo throw an ERROR', () => {
  //   test('Then it should call repo.update and next', async () => {
  //     const error = new Error('Something went wrong');
  //     (repo.update as jest.Mock).mockRejectedValue(error);
  //     const song = { title: 'x', author: 'y' };
  //     req.body = song;
  //     await controller.update(req, res, next);
  //     expect(next).toHaveBeenCalledWith(error);
  //   });
  // });

  // describe('When we use the method delete', () => {
  //   test('Then it should call repo.delete', async () => {
  //     req.params = { id: '1' };
  //     (repo.delete as jest.Mock).mockResolvedValue({});
  //     await controller.delete(req, res, next);
  //     expect(repo.delete).toHaveBeenCalledWith('1');
  //     expect(res.json).toHaveBeenCalledWith({});
  //   });
  // });

  // describe('When we use the method delete and repo throw an ERROR', () => {
  //   test('Then it should call repo.delete and next', async () => {
  //     const error = new Error('Something went wrong');
  //     (repo.delete as jest.Mock).mockRejectedValue(error);
  //     req.params = { id: '1' };
  //     await controller.delete(req, res, next);
  //     expect(repo.delete).toHaveBeenCalledWith('1');
  //     expect(next).toHaveBeenCalledWith(error);
  //   });
  // });
});
