import Joi from 'joi';
import { TYPE } from '@prisma/client';
import { isPowerOf2 } from '../../common/math';

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

export const RingFightSchema = Joi.object({
  ids: Joi.array()
    .items(Joi.number().integer())
    .custom((value, helper) => {
      const n = value.length;
      if (n < 2 || n > 128)
        return helper.message('Min number of ids are 2 and max is 128');

      if (!isPowerOf2(n))
        return helper.message('Number of ids must be a power of 2');

      return true;
    }),
});
