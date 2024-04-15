import Joi from 'joi';
import { type SongCreateDto } from './song';

export const songCreateDtoSchema = Joi.object<SongCreateDto>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().required(),
});

export const songUpdateDtoSchema = Joi.object<SongCreateDto>({
  title: Joi.string(),
  author: Joi.string(),
  year: Joi.number(),
});
