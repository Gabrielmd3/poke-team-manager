import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Trainer } from '../../trainers/entities/trainer.entity';
import { TeamPokemon } from './team-pokemon.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trainerId' }) // Nome explícito da chave estrangeira
  trainer: Trainer;

  @OneToMany(() => TeamPokemon, (teamPokemon) => teamPokemon.team, { cascade: true })
  pokemons: TeamPokemon[];
}