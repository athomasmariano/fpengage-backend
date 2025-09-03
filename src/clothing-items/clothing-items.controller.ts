// src/clothing-items/clothing-items.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ClothingItemsService } from './clothing-items.service';
import { CreateClothingItemDto } from './dto/create-clothing-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { extname } from 'path';

@Controller('clothing-items')
@UseGuards(JwtAuthGuard) // Protege todas as rotas deste controller.
export class ClothingItemsController {
  constructor(private readonly clothingItemsService: ClothingItemsService) {}

  @Post()
  // O FileInterceptor é o responsável por capturar o arquivo da requisição.
  // Ele procura por um campo chamado 'image'.
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Define a pasta onde o arquivo será salvo.
        filename: (req, file, cb) => {
          // Cria um nome de arquivo único para evitar que um arquivo sobrescreva o outro.
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Request() req,
    @Body() createClothingItemDto: CreateClothingItemDto,
    // O @UploadedFile() injeta as informações do arquivo que foi salvo.
    // O tipo 'Express.Multer.File' requer o pacote '@types/multer' instalado.
    @UploadedFile() file: Express.Multer.File,
  ) {
    // O `req.user` é adicionado pela nossa JwtStrategy.
    const userId = req.user.userId;

    // Passamos todos os dados para o serviço, que contém a lógica de negócio.
    return this.clothingItemsService.create(createClothingItemDto, userId, file);
  }

  @Get()
  findAllForUser(@Request() req) {
    const userId = req.user.userId;
    return this.clothingItemsService.findAllForUser(userId);
  }
}