import { Module } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { PokemonController } from './pokemons.controller';
import { PokemonService } from './pokemons.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PrismaService],
})
export class PokemonModule {}
