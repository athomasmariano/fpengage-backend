// src/clothing-items/clothing-items.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClothingItemsService } from './clothing-items.service';
import { CreateClothingItemDto } from './dto/create-clothing-item.dto';

@Controller('clothing-items')
export class ClothingItemsController {
  constructor(private readonly clothingItemsService: ClothingItemsService) {}

  @Post()
  create(@Body() createClothingItemDto: CreateClothingItemDto) {
    // !! IMPORTANTE: VALOR FIXO TEMPORÁRIO !!
    // Vamos simular que a requisição é sempre do usuário com ID 1.
    // Isso será substituído por um @Request() req para pegar o usuário do token JWT.
    const mockUserId = 1;
    return this.clothingItemsService.create(createClothingItemDto, mockUserId);
  }

  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string) {
    // O '+' na frente de userId converte a string do parâmetro para número
    return this.clothingItemsService.findAllForUser(+userId);
  }
}