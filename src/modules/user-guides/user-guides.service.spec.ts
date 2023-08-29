import { Test, TestingModule } from '@nestjs/testing';
import { UserGuidesService } from './user-guides.service';

describe('UserGuidesService', () => {
  let service: UserGuidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGuidesService],
    }).compile();

    service = module.get<UserGuidesService>(UserGuidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
