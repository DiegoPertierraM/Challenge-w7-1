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

const debug = createDebug('W7E:controller:song');

export class SongsController extends BaseController<Song, SongCreateDto> {
  constructor(protected readonly repo: Repo<Song, SongCreateDto>) {
    super(repo, songCreateDtoSchema, songUpdateDtoSchema);

    debug('Instantiated song controller');
  }
}
