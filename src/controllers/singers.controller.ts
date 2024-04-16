import { type NextFunction, type Request, type Response } from 'express';
import { type SingerCreateDto, type Singer } from '../entities/singer';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import {
  singerCreateDtoSchema,
  singerUpdateDtoSchema,
} from '../entities/singer.schema.js';
import { type SingersSqlRepo } from '../repositories/singers.sql.repo.js';

const debug = createDebug('W7E:controller:singer');

export class SingersController {
  constructor(private readonly repo: SingersSqlRepo) {
    debug('Instantiated singer controller');
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
    const data = req.body as Singer;

    const {
      error,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    }: { error: Error | undefined; value: SingerCreateDto } =
      singerCreateDtoSchema.validate(data, { abortEarly: false });

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
    const data = req.body as Singer;

    const { error } = singerUpdateDtoSchema.validate(data, {
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
