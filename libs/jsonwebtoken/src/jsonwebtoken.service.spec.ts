import { Test, TestingModule } from '@nestjs/testing';
import { JSONWebTokenUtilService } from './jsonwebtoken.service';

describe('JsonwebtokenService', () => {
  let service: JSONWebTokenUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JSONWebTokenUtilService],
    }).compile();

    service = module.get<JSONWebTokenUtilService>(JSONWebTokenUtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
