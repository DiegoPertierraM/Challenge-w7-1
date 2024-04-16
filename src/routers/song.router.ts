import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type SongsController } from '../controllers/songs.controller.js';

const debug = createDebug('W7E:songs:router');

export class SongsRouter {
  router = createRouter();

  constructor(private readonly songsController: SongsController) {
    debug('Instantiated songs router');

    this.router.get('/', songsController.getAll.bind(songsController));
    this.router.get('/:id', songsController.getById.bind(songsController));
    this.router.post('/', songsController.create.bind(songsController));
    this.router.patch('/:id', songsController.update.bind(songsController));
    this.router.delete('/:id', songsController.delete.bind(songsController));
  }
}
