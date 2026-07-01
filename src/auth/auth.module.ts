import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Controller com a rota POST /auth/login
import { TrainersModule } from '../trainers/trainers.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TrainersModule,
    PassportModule,
    JwtModule.register({
      secret: 'MINHA_CHAVE_SUPER_SECRETA_DO_POKEMON', // Mesma chave usada no Strategy
      signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}