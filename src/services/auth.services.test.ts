import { type SongsController } from '../controllers/songs.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { Auth } from './auth.services';

describe('Given a instance of the class SongsRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as SongsController;

  const auth = new Auth();
  test('Then it should be instance of the class', () => {
    expect(auth).toBeInstanceOf(Auth);
  });
});
