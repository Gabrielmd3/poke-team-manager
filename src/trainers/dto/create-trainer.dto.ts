import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({ example: 'Ash Ketchum' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ash@pokemon.com' })
  @IsEmail({}, { message: 'Forneça um email válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: 'Pallet Town' })
  @IsOptional()
  hometown?: string;
}