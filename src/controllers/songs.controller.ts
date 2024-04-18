import { type NextFunction, type Request, type Response } from 'express';
import { type SongCreateDto, type Song } from '../entities/song';
import createDebug from 'debug';
import { type SongsSqlRepo } from '../repositories/songs.sql.repo.js';
import { HttpError } from '../middleware/errors.middleware.js';
import {
  songCreateDtoSchema,
  songUpdateDtoSchema,
} from '../entities/song.schema.js';
import { BaseController } from './base.controller.js';
import { type Repo } from '../repositories/type.repo';
import { type Payload } from '../services/auth.services';

const debug = createDebug('W7E:controller:song');

export class SongsController extends BaseController<Song, SongCreateDto> {
  constructor(protected readonly repo: Repo<Song, SongCreateDto>) {
    super(repo, songCreateDtoSchema, songUpdateDtoSchema);

    debug('Instantiated song controller');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    req.body.authorId = (req.body.payload as Payload).id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { payload, ...rest } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.body = rest;
    await super.create(req, res, next);
  }
}
