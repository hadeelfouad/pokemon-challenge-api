import Joi from 'joi';
import { TYPE } from '@prisma/client';

const types = Object.values(TYPE);
export const UpdatePokemonSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string(),
  typeOne: Joi.string().valid(...types),
  typeTwo: Joi.string().valid(...types),
  total: Joi.number().integer(),
  hp: Joi.number().integer(),
  attack: Joi.number().integer(),
  defense: Joi.number().integer(),
  spAtk: Joi.number().integer(),
  spDef: Joi.number().integer(),
  speed: Joi.number().integer(),
  generation: Joi.number().integer(),
  isLegendary: Joi.boolean(),
});
