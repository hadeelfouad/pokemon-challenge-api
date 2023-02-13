import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './entities/pokemons/pokemons.module';

@Module({
  imports: [PokemonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
