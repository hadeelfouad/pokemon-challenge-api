import { converge, curry, identity, path, pluck, zipObj } from 'ramda';
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
export const getPossibleDamage = curry((atkId, defId, pokemons) =>
  converge(getTypeModifier, [
    path([atkId, 'typeOne']),
    path([defId, 'typeOne']),
  ])(pokemons),
);
