import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Equipe Rocket', description: 'Nome do time' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do time é obrigatório' })
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'uuid-do-treinador', description: 'ID do treinador dono do time' })
  @IsUUID(4, { message: 'O ID do treinador deve ser um UUID válido' })
  @IsNotEmpty()
  trainerId: string;
}