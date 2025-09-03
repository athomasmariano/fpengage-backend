import { PartialType } from '@nestjs/mapped-types';
import { CreateClothingItemDto } from './create-clothing-item.dto';

export class UpdateClothingItemDto extends PartialType(CreateClothingItemDto) {}
