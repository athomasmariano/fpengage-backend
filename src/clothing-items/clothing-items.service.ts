// src/clothing-items/clothing-items.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClothingItemDto } from './dto/create-clothing-item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClothingItemsService {
  // Injetamos o PrismaService para ter acesso ao banco
  constructor(private prisma: PrismaService) {}

  // --- Método para CRIAR um item de roupa ---
  // Precisamos saber o ID do usuário dono do item
  async create(createClothingItemDto: CreateClothingItemDto, ownerId: number) {
    // Verificamos se o usuário realmente existe antes de associar o item a ele
    const user = await this.prisma.user.findUnique({ where: { id: ownerId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${ownerId} não encontrado.`);
    }

    return this.prisma.clothingItem.create({
      data: {
        name: createClothingItemDto.name,
        category: createClothingItemDto.category,
        imageUrl: createClothingItemDto.imageUrl,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }

  // --- Método para BUSCAR todos os itens de um usuário específico ---
  async findAllForUser(ownerId: number) {
    return this.prisma.clothingItem.findMany({
      where: {
        ownerId: ownerId,
      },
      orderBy: {
        createdAt: 'desc', // Mostra os mais recentes primeiro
      },
    });
  }
}