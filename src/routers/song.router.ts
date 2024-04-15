import { Router as router } from 'express';
import { SongController } from '../controllers/song.controller.js';
import createDebug from 'debug';
import { SongMemoryRepository } from '../repositories/song.memory.repo.js';

const debug = createDebug('W6E:router:song');
debug('Starting song router');
export const songRouter = router();
const songRepo = new SongMemoryRepository();
const songController = new SongController(songRepo);

songRouter.get('/', songController.getAll.bind(songController));
songRouter.get('/:id', songController.getById.bind(songController));
songRouter.post('/', songController.create.bind(songController));
songRouter.patch('/:id', songController.update.bind(songController));
songRouter.delete('/:id', songController.delete.bind(songController));
