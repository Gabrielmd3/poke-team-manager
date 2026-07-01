import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@ApiTags('Trainers')
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo treinador' })
  @ApiResponse({ status: 201, description: 'Treinador criado com sucesso.' })
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os treinadores' })
  findAll() {
    return this.trainersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um treinador pelo ID' })
  findOne(@Param('id') id: string) {
    return this.trainersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um treinador' })
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainersService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um treinador' })
  remove(@Param('id') id: string) {
    return this.trainersService.remove(id);
  }
}