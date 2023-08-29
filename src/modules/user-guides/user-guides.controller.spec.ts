import { Test, TestingModule } from '@nestjs/testing';
import { UserGuidesController } from './user-guides.controller';
import { UserGuidesService } from './user-guides.service';

describe('UserGuidesController', () => {
  let controller: UserGuidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGuidesController],
      providers: [UserGuidesService],
    }).compile();

    controller = module.get<UserGuidesController>(UserGuidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
