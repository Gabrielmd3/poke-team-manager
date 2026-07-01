import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class PokeApiService {
  constructor(private readonly httpService: HttpService) {}

  async getPokemonDetails(identifier: string) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${identifier.toString().toLowerCase().trim()}`;
      const response = await firstValueFrom(this.httpService.get(url));
      
      return {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map((t: any) => t.type.name),
        sprite: response.data.sprites.front_default,
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new NotFoundException(`Pokémon '${identifier}' não foi encontrado na PokéAPI.`);
      }
      throw new InternalServerErrorException('Erro ao consultar a PokéAPI.');
    }
  }
}