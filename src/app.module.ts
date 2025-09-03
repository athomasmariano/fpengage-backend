// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClothingItemsModule } from './clothing-items/clothing-items.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Adiciona a configuração para servir arquivos estáticos
    ServeStaticModule.forRoot({
      // Define o caminho físico da pasta onde os arquivos estão
      rootPath: join(__dirname, '..', 'uploads'),
      // Define o prefixo da URL para acessar esses arquivos
      serveRoot: '/uploads',
    }),
    UsersModule,
    PrismaModule,
    ClothingItemsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}