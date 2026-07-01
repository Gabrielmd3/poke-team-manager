import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainersModule } from './trainers/trainers.module';
import { Trainer } from './trainers/entities/trainer.entity';
import { PokeApiModule } from './external/poke-api/poke-api.module';
import { TeamsModule } from './teams/teams.module';
import { Team } from './teams/entities/team.entity';
import { TeamPokemon } from './teams/entities/team-pokemon.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. Carrega as variáveis do .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. Configura o TypeORM conectando no Postgres
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Trainer, Team, TeamPokemon], // Adicione as futuras entidades aqui
        synchronize: true, // APENAS PARA DESENVOLVIMENTO: cria as tabelas automaticamente
      }),
    }),

    // 3. Importa os módulos da aplicação
    TrainersModule,

    AuthModule,
    
    PokeApiModule,

    TeamsModule,
  ],
})
export class AppModule {}