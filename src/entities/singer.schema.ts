import Joi from 'joi';
import { type SingerCreateDto } from './singer';

export const singerCreateDtoSchema = Joi.object<SingerCreateDto>({
  name: Joi.string().required(),
  band: Joi.string().required(),
  age: Joi.number().required(),
});

export const singerUpdateDtoSchema = Joi.object<SingerCreateDto>({
  name: Joi.string(),
  band: Joi.string(),
  age: Joi.number(),
});
