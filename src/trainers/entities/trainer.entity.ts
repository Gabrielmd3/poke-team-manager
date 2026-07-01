import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from '../../teams/entities/team.entity'; 

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  hometown?: string;

  @OneToMany(() => Team, (team) => team.trainer)
  teams: Team[];
}