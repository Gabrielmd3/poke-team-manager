import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'ash@pokemon.com', description: 'Email do treinador' })
  @IsEmail({}, { message: 'Forneça um email válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha de acesso' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty()
  password: string;
}