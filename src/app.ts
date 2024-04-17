import cors from 'cors';
import createDebug from 'debug';
import express, { type Express } from 'express';
import morgan from 'morgan';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { SongsController } from './controllers/songs.controller.js';
import { SongsRouter } from './routers/song.router.js';
import { type PrismaClient } from '@prisma/client';
import { UsersController } from './controllers/users.controller.js';
import { UsersRouter } from './routers/users.router.js';
import { SongsSqlRepo } from './repositories/songs.sql.repo.js';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
const debug = createDebug('W7E:app');

export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const songSqlRepo = new SongsSqlRepo(prisma);
  const songsController = new SongsController(songSqlRepo);
  const songsRouter = new SongsRouter(songsController);
  app.use('/songs', songsRouter.router);

  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UsersController(usersRepo);
  const usersRouter = new UsersRouter(usersController);
  app.use('/users', usersRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
