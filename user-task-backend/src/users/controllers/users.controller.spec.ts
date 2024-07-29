import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    // Create a mock UsersService
    const mockUsersService = {
      getAllUser: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };

    // Configure the testing module to use the mock service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result: User[] = [];
      jest.spyOn(service, 'getAllUser').mockResolvedValue(result);
      expect(await controller.getAllUsers()).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should retrieve and return a single user', async () => {
      const mockUser: User = { /* properties */ } as User;
      jest.spyOn(service, 'getUserById').mockResolvedValue(mockUser);
      expect(await controller.getUserById('1')).toBe(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a user and return that', async () => {
      const mockUser: User = { /* properties */ } as User;
      jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);
      expect(await controller.createUser('John', 'Doe', 'john@example.com', { create: true, delete: false, view: true, move: true })).toBe(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue();
      expect(await controller.deleteUser('1')).toBe('user 1 is deleted');
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const mockUser: User = { /* properties */ } as User;
      jest.spyOn(service, 'updateUser').mockResolvedValue(mockUser);
      expect(await controller.updateUser('1', 'John', 'Doe', 'john@example.com', { create: true, delete: false, view: true, move: true })).toBe(mockUser);
    });
  });
});
