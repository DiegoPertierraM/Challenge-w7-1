import cors from 'cors';
import createDebug from 'debug';
import express, { type Express } from 'express';
import morgan from 'morgan';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { SongsController } from './controllers/songs.controller.js';
import { SongsFsRepo } from './repositories/songs.fs.repo.js';
import { SongsRouter } from './routers/song.router.js';
import { type PrismaClient } from '@prisma/client';
import { SingersSqlRepo } from './repositories/singers.sql.repo.js';
import { SingersController } from './controllers/singers.controller.js';
import { SingersRouter } from './routers/singer.router.js';
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

  const songFsRepo = new SongsFsRepo();
  const songsController = new SongsController(songFsRepo);
  const songsRouter = new SongsRouter(songsController);
  app.use('/songs', songsRouter.router);

  const singersRepo = new SingersSqlRepo(prisma);
  const singersController = new SingersController(singersRepo);
  const singersRouter = new SingersRouter(singersController);
  app.use('/singers', singersRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
