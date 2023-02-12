import { Test } from '@nestjs/testing';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { PokemonController } from './pokemons.controller';
import { PokemonService } from './pokemons.service';

describe('PokemonController', () => {
  let pokemonController;
  let pokemonService;
  const pokemons = [
    { id: 1, typeOne: 'ELECTRIC', attack: 10, defense: 10, hp: 50 },
    { id: 2, typeOne: 'WATER', attack: 10, defense: 10, hp: 10 },
    { id: 3, typeOne: 'ROCK', attack: 10, defense: 10, hp: 50 },
    { id: 4, typeOne: 'ROCK', attack: 10, defense: 10, hp: 10 },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService, PrismaService],
    }).compile();

    pokemonService = moduleRef.get(PokemonService);
    pokemonController = moduleRef.get(PokemonController);
  });

  describe('findMany', () => {
    test('should return an array of pokemons', async () => {
      jest.spyOn(pokemonService, 'findMany').mockImplementation(() => pokemons);

      expect(await pokemonController.findMany()).toBe(pokemons);
    });
  });

  describe('findUnique', () => {
    test('should return a single pokemon', async () => {
      jest
        .spyOn(pokemonService, 'findUnique')
        .mockImplementation(id => pokemons.find(p => p.id === id));

      expect(await pokemonController.findUnique(1)).toBe(pokemons[0]);
    });

    test('should not return a pokemon', async () => {
      jest
        .spyOn(pokemonService, 'findUnique')
        .mockImplementation(id => pokemons.find(p => p.id === id));

      expect(await pokemonController.findUnique(3)).not.toBeDefined();
    });
  });

  describe('getDamage', () => {
    test('should return the expected damage', async () => {
      jest
        .spyOn(pokemonService, 'findByIds')
        .mockImplementation(() => pokemons.slice(0, 2));

      expect(await pokemonController.getDamage(1, 2)).toBe(60);
    });
  });

  describe('ringFight', () => {
    test('should return a single round', async () => {
      jest
        .spyOn(pokemonService, 'findByIds')
        .mockImplementation(() => pokemons.slice(0, 2));

      expect(await pokemonController.ringFight({ ids: [1, 2] })).toStrictEqual(
        expect.objectContaining({ 2: expect.anything(Array) }),
      );
    });

    test('should return a two round', async () => {
      jest
        .spyOn(pokemonService, 'findByIds')
        .mockImplementation(() => pokemons);

      expect(
        await pokemonController.ringFight({ ids: [1, 2, 3, 4] }),
      ).toStrictEqual(
        expect.objectContaining({
          2: expect.anything(Array),
          4: expect.anything(Array),
        }),
      );
    });
  });
});
