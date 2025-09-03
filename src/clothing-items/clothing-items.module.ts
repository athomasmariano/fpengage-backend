import { Module } from '@nestjs/common';
import { ClothingItemsService } from './clothing-items.service';
import { ClothingItemsController } from './clothing-items.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClothingItemsController],
  providers: [ClothingItemsService],
})
export class ClothingItemsModule {}