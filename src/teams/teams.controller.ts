import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Teams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo time para um treinador' })
  @ApiResponse({ status: 201, description: 'Time criado com sucesso.' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os times (com seus treinadores e pokémons)' })
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um time específico pelo ID' })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um time (ex: nome)' })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um time' })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }

  @Post(':id/pokemons')
  @ApiOperation({ summary: 'Adicionar um Pokémon a um time' })
  addPokemon(@Param('id') id: string, @Body() addPokemonDto: AddPokemonDto) {
    return this.teamsService.addPokemonToTeam(id, addPokemonDto);
  }

  @Get(':id/pokemons')
  @ApiOperation({ summary: 'Listar os Pokémons de um time (enriquecido com PokéAPI)' })
  getTeamPokemons(@Param('id') id: string) {
    return this.teamsService.getTeamPokemons(id);
  }

  @Delete(':teamId/pokemons/:pokemonId')
  @ApiOperation({ summary: 'Remover um Pokémon específico do time' })
  removePokemon(
    @Param('teamId') teamId: string, 
    @Param('pokemonId') pokemonId: string
  ) {
    return this.teamsService.removePokemonFromTeam(teamId, pokemonId);
  }
}