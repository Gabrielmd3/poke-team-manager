import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Injectable()
export class TrainersRepository {
  constructor(
    @InjectRepository(Trainer)
    private readonly ormRepository: Repository<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const trainer = this.ormRepository.create(createTrainerDto);
    return await this.ormRepository.save(trainer);
  }

  async findAll(): Promise<Trainer[]> {
    return await this.ormRepository.find();
  }

  async findById(id: string): Promise<Trainer | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    return await this.ormRepository.findOne({ where: { email } });
  }
  
  async save(trainer: Trainer): Promise<Trainer> {
    return await this.ormRepository.save(trainer);
  }

  async remove(trainer: Trainer): Promise<void> {
    await this.ormRepository.remove(trainer);
  }
}