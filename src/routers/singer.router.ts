import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type SingersController } from '../controllers/singers.controller.js';

const debug = createDebug('W7E:songs:router');

export class SingersRouter {
  router = createRouter();

  constructor(private readonly singersController: SingersController) {
    debug('Instantiated singer router');

    this.router.get('/', singersController.getAll.bind(singersController));
    this.router.get('/:id', singersController.getById.bind(singersController));
    this.router.post('/', singersController.create.bind(singersController));
    this.router.patch('/:id', singersController.update.bind(singersController));
    this.router.delete(
      '/:id',
      singersController.delete.bind(singersController)
    );
  }
}
