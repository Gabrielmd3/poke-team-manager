import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({ example: 'Ash Ketchum', description: 'Nome do treinador' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do treinador é obrigatório' })
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Pallet Town', description: 'Cidade de origem' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  hometown?: string;
}