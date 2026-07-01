import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainersRepository } from './trainers.repository';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainersService {
  constructor(private readonly trainersRepository: TrainersRepository) {}

  async create(createTrainerDto: CreateTrainerDto) {
    return await this.trainersRepository.create(createTrainerDto);
  }

  async findAll() {
    return await this.trainersRepository.findAll();
  }

  async findOne(id: string) {
    const trainer = await this.trainersRepository.findById(id);
    if (!trainer) {
      throw new NotFoundException(`Treinador com ID ${id} não encontrado.`);
    }
    return trainer;
  }

  async update(id: string, updateTrainerDto: UpdateTrainerDto) {
    const trainer = await this.findOne(id);
    Object.assign(trainer, updateTrainerDto);
    return await this.trainersRepository.save(trainer);
  }

  async remove(id: string) {
    const trainer = await this.findOne(id);
    await this.trainersRepository.remove(trainer);
    return { message: 'Treinador removido com sucesso' };
  }
}