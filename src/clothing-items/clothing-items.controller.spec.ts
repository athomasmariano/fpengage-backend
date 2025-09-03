import { Test, TestingModule } from '@nestjs/testing';
import { ClothingItemsController } from './clothing-items.controller';
import { ClothingItemsService } from './clothing-items.service';

describe('ClothingItemsController', () => {
  let controller: ClothingItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothingItemsController],
      providers: [ClothingItemsService],
    }).compile();

    controller = module.get<ClothingItemsController>(ClothingItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
