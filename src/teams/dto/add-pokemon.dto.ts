import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPokemonDto {
  @ApiProperty({ example: 'pikachu', description: 'ID numérico ou nome do Pokémon na PokéAPI' })
  @IsString()
  @IsNotEmpty()
  pokemonIdentifier: string;
}