// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <--- VERIFIQUE SE ESTA LINHA DE IMPORT EXISTE

@Module({
  imports: [PrismaModule], // <--- VERIFIQUE SE O PRISMA MODULE ESTÁ AQUI
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}