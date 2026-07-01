import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { Trainer } from './entities/trainer.entity';
import { TrainersRepository } from './trainers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainersController],
  providers: [TrainersService, TrainersRepository],
  exports: [TrainersService],
})
export class TrainersModule {}