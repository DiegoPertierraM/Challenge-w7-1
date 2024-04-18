import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type SongsController } from '../controllers/songs.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W7E:songs:router');

export class SongsRouter {
  router = createRouter();

  constructor(
    private readonly songsController: SongsController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated songs router');

    this.router.get('/', songsController.getAll.bind(songsController));
    this.router.get('/:id', songsController.getById.bind(songsController));
    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      songsController.create.bind(songsController)
    );
    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      songsController.update.bind(songsController)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      songsController.delete.bind(songsController)
    );
  }
}
