import { type Request, type Response } from 'express';
import { type Song } from '../entities/song';
import createDebug from 'debug';
import { type SongMemoryRepository } from '../repositories/song.memory.repo.js';

const debug = createDebug('W6E:controller:song');

export class SongController {
  constructor(private readonly repo: SongMemoryRepository) {
    debug('Instantiated song controller');
  }

  getAll(req: Request, res: Response) {
    const result = this.repo.readAll();
    res.json(result);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.readById(id);
    res.json(result);
  }

  create(req: Request, res: Response) {
    const data = req.body as Song;
    const result = this.repo.create(data);
    res.status(201);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as Song;
    const result = this.repo.update(id, data);
    res.json(result);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.delete(id);
    res.json(result);
  }
}
