import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity('team_pokemons')
export class TeamPokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemonIdentifier: string; // Pode ser "25" ou "pikachu"

  @ManyToOne(() => Team, (team) => team.pokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Team;
}