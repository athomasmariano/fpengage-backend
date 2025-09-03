// src/clothing-items/dto/create-clothing-item.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClothingItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  // O campo imageUrl foi removido daqui.
}