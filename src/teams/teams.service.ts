import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TrainersService } from '../trainers/trainers.service';
import { PokeApiService } from '../external/poke-api/poke-api.service';
import { AddPokemonDto } from './dto/add-pokemon.dto';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly trainersService: TrainersService, // Injetando o serviço de treinadores
    private readonly pokeApiService: PokeApiService, // Injetando o serviço da PokéAPI
  ) { }

  async create(createTeamDto: CreateTeamDto) {
    // 1. Valida se o treinador dono do time realmente existe
    const trainer = await this.trainersService.findOne(createTeamDto.trainerId);

    // 2. Cria o time passando os dados e a entidade do treinador
    return await this.teamsRepository.create(createTeamDto, trainer);
  }

  async findAll() {
    return await this.teamsRepository.findAll();
  }

  async findOne(id: string) {
    const team = await this.teamsRepository.findById(id);
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado.`);
    }
    return team;
  }
  

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id);

    if (updateTeamDto.name) {
      team.name = updateTeamDto.name;
    }

    return await this.teamsRepository.save(team);
  }

  async remove(id: string) {
    const team = await this.findOne(id);
    await this.teamsRepository.remove(team);
    return { message: 'Time removido com sucesso' };
  }

  async addPokemonToTeam(teamId: string, addPokemonDto: AddPokemonDto) {
    const team = await this.findOne(teamId);

    if (team.pokemons.length >= 6) {
      throw new BadRequestException('O time já atingiu o limite máximo de 6 Pokémons.');
    }

    // Valida na PokéAPI (vai lançar erro 404 se não existir)
    const pokeDetails = await this.pokeApiService.getPokemonDetails(addPokemonDto.pokemonIdentifier);

    // Salva no banco o nome oficial retornado pela API
    await this.teamsRepository.addPokemon(team, pokeDetails.name);

    return { message: `${pokeDetails.name} adicionado com sucesso ao time!` };
  }

  // 2. LISTAR COM ENRIQUECIMENTO DE DADOS
  async getTeamPokemons(teamId: string) {
    const team = await this.findOne(teamId);

    // Mapeia os identificadores e busca os detalhes de cada um na PokéAPI de forma paralela
    const pokemonsDetails = await Promise.all(
      team.pokemons.map(async (poke) => {
        const details = await this.pokeApiService.getPokemonDetails(poke.pokemonIdentifier);
        return {
          idNoBanco: poke.id, // O seu UUID para caso queira deletar depois
          ...details, // Dados ricos da PokéAPI
        };
      })
    );

    return pokemonsDetails;
  }

  // 3. REMOVER POKÉMON
  async removePokemonFromTeam(teamId: string, teamPokemonId: string) {
    // Garante que o time existe
    await this.findOne(teamId);
    await this.teamsRepository.removePokemon(teamPokemonId);
    return { message: 'Pokémon removido do time' };
  }
}