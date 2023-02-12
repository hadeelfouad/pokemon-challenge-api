import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { createDetailsObject } from './pokemons.helper';
import { assoc, pipe, pluck, sort, splitEvery, map } from 'ramda';

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

  async getDamage(attackerId, defenderId) {
    const pokemons = await this.findByIds([attackerId, defenderId]);
    const details = createDetailsObject(pokemons);

    return this.#possibleDamage(details[attackerId], details[defenderId]);
  }

  #possibleDamage(attacker, defender) {
    const { typeOne: atkType, attack } = attacker;
    const { typeOne: defType, defense } = defender;
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

  async ringFight(ids) {
    let pokemons = await this.findByIds(ids);
    const details = createDetailsObject(pokemons);
    let round = pokemons.length;
    const results = {};
    do {
      const roundOutCome = this.#getRoundOutCome(pokemons);
      results[round] = roundOutCome;
      const winnersIds = pluck('winnerId', roundOutCome);
      pokemons = map(id => details[id], winnersIds);
      round = pokemons.length;
    } while (pokemons.length > 1);
    return results;
  }

  #fightOutcome(attacker, defender) {
    const damage = this.#possibleDamage(attacker, defender);
    const { hp: defenderHp } = defender;
    const currentDefenderHp = defenderHp - damage;
    if (currentDefenderHp <= 0) return attacker;
    const updatedDefender = assoc('hp', currentDefenderHp, defender);
    return this.#fightOutcome(updatedDefender, attacker);
  }

  #fight(attacker, defender) {
    const winner = this.#fightOutcome(attacker, defender);
    return {
      winnerId: winner.id,
      atkId: attacker.id,
      defId: defender.id,
    };
  }

  #createFights(pokemons) {
    return pipe(
      sort(() => Math.random() - 0.5),
      splitEvery(2),
    )(pokemons);
  }

  #getRoundOutCome(pokemons) {
    const fights = this.#createFights(pokemons);
    const roundOutCome = map(([attacker, defender]) => {
      return this.#fight(attacker, defender);
    }, fights);
    return roundOutCome;
  }
}
