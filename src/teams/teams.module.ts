import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { TeamsRepository } from './teams.repository';
import { TrainersModule } from '../trainers/trainers.module';
import { PokeApiModule } from '../external/poke-api/poke-api.module'; // <-- NOVO

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamPokemon]),
    TrainersModule,
    PokeApiModule, // <-- NOVO
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService, TeamsRepository],
})
export class TeamsModule {}