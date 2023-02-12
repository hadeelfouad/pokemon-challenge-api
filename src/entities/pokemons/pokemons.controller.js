import {
  Bind,
  Body,
  Controller,
  DefaultValuePipe,
  Dependencies,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PokemonService } from './pokemons.service';
import { RingFightSchema, UpdatePokemonSchema } from './pokemons.schema';
import { JoiValidationPipe } from '../../common/pipes/joi';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Controller('pokemons')
@UseGuards(JwtAuthGuard)
@Dependencies(PokemonService)
export class PokemonController {
  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  @Get('/damage')
  @Bind(Query('atkId', ParseIntPipe), Query('defId', ParseIntPipe))
  async getDamage(atkId, defId) {
    return this.pokemonService.getDamage(atkId, defId);
  }

  @Post('/ring-fight')
  @HttpCode(200)
  @Bind(Body(new JoiValidationPipe(RingFightSchema)))
  async ringFight(input) {
    return this.pokemonService.ringFight(input.ids);
  }

  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  findUnique(id) {
    return this.pokemonService.findUnique(id);
  }

  @Put()
  @Bind(Body(new JoiValidationPipe(UpdatePokemonSchema)))
  async update(input) {
    return this.pokemonService.update(input);
  }

  @Get()
  @Bind(
    Query('page', new DefaultValuePipe('1'), ParseIntPipe),
    Query('limit', new DefaultValuePipe('10'), ParseIntPipe),
  )
  findMany(page, limit) {
    return this.pokemonService.findMany(page, limit);
  }
}
