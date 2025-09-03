// src/prisma/prisma.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // 1. Importe o PrismaService

@Module({
  providers: [PrismaService], // 2. Adicione o serviço aos 'providers' do módulo
  exports: [PrismaService],   // 3. Exporte o serviço para que outros módulos possam usá-lo
})
export class PrismaModule {}