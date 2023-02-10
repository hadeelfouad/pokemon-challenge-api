import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { createDetailsObject } from './pokemons.helper';

@Injectable()
@Dependencies(PrismaService)
export class PokemonService {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  async findMany(page, limit) {
    return this.prismaService.pokemon.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findUnique(id) {
    return this.prismaService.pokemon.findUnique({ where: { id } });
  }

  async update(input) {
    const { id, ...data } = input;
    return this.prismaService.pokemon.update({ where: { id }, data });
  }

  async findByIds(ids) {
    return this.prismaService.pokemon.findMany({
      where: { id: { in: ids } },
    });
  }

  async getDamage(atkId, defId) {
    const pokemons = await this.findByIds([atkId, defId]);
    const details = createDetailsObject(pokemons);
    const { typeOne: atkType, attack } = details[atkId];
    const { typeOne: defType, defense } = details[defId];
    const typeModifier = this.#getTypeModifier(atkType, defType);

    return 30 * (attack / defense) * typeModifier;
  }

  #getTypeModifier(atkType, defType) {
    const modifiers = {
      ELECTRIC: {
        ROCK: 0.5,
        WATER: 2,
      },
    };
    return modifiers[atkType]?.[defType] || 1;
  }
}
