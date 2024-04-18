import { type Request, type Response } from 'express';
import { HttpError } from './errors.middleware';
import { AuthInterceptor } from './auth.interceptor';

const req = {
  get: jest.fn().mockReturnValue('InvalidToken'),
} as unknown as Request;
const res = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;
const next = jest.fn();
const error = new HttpError(498, 'Token expired/invalid', 'Token invalid');

describe('Given a instance of the class AuthInterceptor', () => {
  const authInterceptor = new AuthInterceptor();
  test('Then it should be instance of the class', () => {
    expect(authInterceptor).toBeInstanceOf(AuthInterceptor);
  });
  describe('When we call the method authentication and data doesnt start with Bearer', () => {
    test('Then it should throw an error', () => {
      authInterceptor.authentication(req, res, next);
      expect(req.get).toHaveBeenCalledWith('Authorization');
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
