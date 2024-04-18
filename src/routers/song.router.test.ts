import { type SongsController } from '../controllers/songs.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { SongsRouter } from './song.router';

describe('Given a instance of the class SongsRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as SongsController;

  const authInterceptor = {
    authentication: jest.fn(),
  } as unknown as AuthInterceptor;

  const router = new SongsRouter(controller, authInterceptor);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(SongsRouter);
  });
});
