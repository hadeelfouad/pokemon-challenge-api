import {
  BadRequestException,
  Bind,
  Body,
  Controller,
  DefaultValuePipe,
  Dependencies,
  Get,
  HttpCode,
  NotFoundException,
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
    try {
      return await this.pokemonService.getDamage(atkId, defId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/ring-fight')
  @HttpCode(200)
  @Bind(Body(new JoiValidationPipe(RingFightSchema)))
  async ringFight(input) {
    try {
      return await this.pokemonService.ringFight(input.ids);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async findUnique(id) {
    const pokemon = await this.pokemonService.findUnique(id);
    if (pokemon) return pokemon;
    throw new NotFoundException('Id not found');
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
