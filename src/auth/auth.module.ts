// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module'; // UsersService
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UsersModule, // Para ter acesso ao UsersService
    JwtModule.register({
      secret: 'SEGREDO_SUPER_SECRETO',
      signOptions: { expiresIn: '1d' }, // O token expira em 1 dia
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // JwtStrategy aqui
})
export class AuthModule {}