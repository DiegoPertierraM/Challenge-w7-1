import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type SongsController } from '../controllers/songs.controller.js';

const debug = createDebug('W7E:songs:router');

export class SongsRouter {
  router = createRouter();

  constructor(private readonly controller: SongsController) {
    debug('Instantiated songs router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
