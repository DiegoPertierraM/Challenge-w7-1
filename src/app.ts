import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { SongsController } from './controllers/songs.controller.js';
import { SongsFsRepo } from './repositories/songs.fs.repo.js';
import { SongsRouter } from './routers/song.router.js';

export const createApp = () => {
  const app = express();

  const debug = createDebug('W7E:app');
  debug('Starting app');

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const songFsRepo = new SongsFsRepo();
  const songsController = new SongsController(songFsRepo);
  const songsRouter = new SongsRouter(songsController);
  app.use('/songs', songsRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));

  return app;
};
