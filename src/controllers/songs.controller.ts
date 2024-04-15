import { type NextFunction, type Request, type Response } from 'express';
import { type SongCreateDto, type Song } from '../entities/song';
import createDebug from 'debug';
import { type SongsFsRepo } from '../repositories/songs.fs.repo.js';
import { HttpError } from '../middleware/errors.middleware.js';
import {
  songCreateDtoSchema,
  songUpdateDtoSchema,
} from '../entities/song.schema.js';

const debug = createDebug('W7E:controller:song');

export class SongsController {
  constructor(private readonly repo: SongsFsRepo) {
    debug('Instantiated song controller');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Song;

    const {
      error,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    }: { error: Error | undefined; value: SongCreateDto } =
      songCreateDtoSchema.validate(data, { abortEarly: false });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(value);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as Song;

    const { error } = songUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
