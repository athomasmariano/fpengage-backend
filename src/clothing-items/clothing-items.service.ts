// src/clothing-items/clothing-items.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClothingItemDto } from './dto/create-clothing-item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Express } from 'express';

@Injectable()
export class ClothingItemsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createClothingItemDto: CreateClothingItemDto,
    ownerId: number,
    file: Express.Multer.File,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: ownerId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${ownerId} não encontrado.`);
    }

    // ======================================================================
    // ## A CORREÇÃO FINAL ESTÁ AQUI ##
    // Troque 'SEU_IP_DE_REDE_AQUI' pelo seu endereço IPv4 (ex: 192.168.0.10)
    // Você pode encontrá-lo rodando 'ipconfig' no Prompt de Comando do Windows.
    // ======================================================================
    const baseUrl = 'http://192.168.15.24:3000';
    const imageUrl = `${baseUrl}/uploads/${file.filename}`;

    return this.prisma.clothingItem.create({
      data: {
        name: createClothingItemDto.name,
        category: createClothingItemDto.category,
        imageUrl: imageUrl, // Salva a URL correta e acessível pelo emulador
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