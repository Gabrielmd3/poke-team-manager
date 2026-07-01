import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TrainersRepository } from './trainers.repository';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TrainersService {
  constructor(private readonly trainersRepository: TrainersRepository) { }

  async create(createTrainerDto: CreateTrainerDto) {

    const hashedPassword = await bcrypt.hash(createTrainerDto.password, 10);

    const trainerData = {
      ...createTrainerDto,
      password: hashedPassword,
    };

    try {
      return await this.trainersRepository.create(trainerData);
    } catch (error) {
      if ((error as any).code === '23505') {
        throw new ConflictException('Este email já está em uso.');
      }
      throw error;
    }
  }


  async findByEmail(email: string) {
    // Supondo que você crie este método no seu repository:
    return await this.trainersRepository.findByEmail(email); 
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