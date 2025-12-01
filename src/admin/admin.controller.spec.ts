import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            getStats: jest.fn(),
            findAllUsers: jest.fn(),
            createUser: jest.fn(),
            deleteUser: jest.fn(),
            findAllSpecies: jest.fn(),
            createSpecies: jest.fn(),
            deleteSpecies: jest.fn(),
            findAllFormulas: jest.fn(),
            createFormula: jest.fn(),
            deleteFormula: jest.fn(),
            getConfig: jest.fn(),
            updateConfig: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
