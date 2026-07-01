import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Trainer } from '../trainers/entities/trainer.entity';

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectRepository(Team)
    private readonly ormRepository: Repository<Team>,

    @InjectRepository(TeamPokemon) // <-- Injetando a entidade TeamPokemon
    private readonly teamPokemonRepository: Repository<TeamPokemon>,
  ) {}

  async create(createTeamDto: CreateTeamDto, trainer: Trainer): Promise<Team> {
    const team = this.ormRepository.create({
      name: createTeamDto.name,
      trainer: trainer,
    });
    return await this.ormRepository.save(team);
  }

 async findAll(): Promise<Team[]> {
    return await this.ormRepository.find({ 
      relations: { 
        trainer: true, 
        pokemons: true 
      } 
    });
  }

  async findById(id: string): Promise<Team | null> {
    return await this.ormRepository.findOne({ 
      where: { id },
      relations: { 
        trainer: true, 
        pokemons: true 
      } 
    });
  }

  async save(team: Team): Promise<Team> {
    return await this.ormRepository.save(team);
  }

  async remove(team: Team): Promise<void> {
    await this.ormRepository.remove(team);
  }

  async addPokemon(team: Team, identifier: string): Promise<TeamPokemon> {
    const teamPokemon = this.teamPokemonRepository.create({
      pokemonIdentifier: identifier,
      team: team,
    });
    return await this.teamPokemonRepository.save(teamPokemon);
  }

  async removePokemon(pokemonId: string): Promise<void> {
    await this.teamPokemonRepository.delete(pokemonId);
  }
}