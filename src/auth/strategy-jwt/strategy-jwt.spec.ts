import { Test, TestingModule } from '@nestjs/testing';
import { StrategyJwt } from './strategy-jwt';

describe('StrategyJwt', () => {
  let provider: StrategyJwt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrategyJwt],
    }).compile();

    provider = module.get<StrategyJwt>(StrategyJwt);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
