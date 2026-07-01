import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TrainersService } from '../trainers/trainers.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly trainersService: TrainersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const trainer = await this.trainersService.findByEmail(loginDto.email);
    
    if (!trainer) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, trainer.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: trainer.id, email: trainer.email };

    return {
      access_token: this.jwtService.sign(payload),
      trainerId: trainer.id,
    };
  }
}