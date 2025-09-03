// src/clothing-items/dto/create-clothing-item.dto.ts

import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateClothingItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}