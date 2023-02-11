import { converge, identity, pluck, zipObj } from 'ramda';
export const getTypeModifier = (atkType, defType) => {
  const modifiers = {
    ELECTRIC: {
      ROCK: 0.5,
      WATER: 2,
    },
  };
  return modifiers[atkType]?.[defType] || 1;
};

export const createDetailsObject = converge(zipObj, [pluck('id'), identity]);
