import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepositoryFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUser', () => {
    it('should return an array of users', async () => {
      const expectedResult: User[] = [];
      mockRepository.find.mockReturnValue(Promise.resolve(expectedResult));
      expect(await service.getAllUser()).toBe(expectedResult);
    });
  });

  describe('getUserById', () => {
    it('should retrieve and return a single user', async () => {
      const mockUser: User = new User();
      mockRepository.findOne.mockReturnValue(Promise.resolve(mockUser));
      expect(await service.getUserById('1')).toBe(mockUser);
    });
  });

  describe('createUser', () => {
    it('should successfully create a user', async () => {
      const newUser: User = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        actions: { create: true, delete: false, view: true, move: false },
      } as User;
      mockRepository.create.mockReturnValue(newUser);
      mockRepository.save.mockReturnValue(Promise.resolve(newUser));
      expect(await service.createUser('John', 'Doe', 'john@example.com', { create: true, delete: false, view: true, move: false })).toEqual(newUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      mockRepository.delete.mockReturnValue(Promise.resolve());
      await service.deleteUser('1');
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const updatedUser: User = new User();
      mockRepository.update.mockReturnValue(Promise.resolve());
      mockRepository.findOne.mockReturnValue(Promise.resolve(updatedUser));
      expect(await service.updateUser('1', 'John', 'Doe', 'john@example.com', { create: true, delete: false, view: true, move: false })).toBe(updatedUser);
    });
  });
});

// Helper functions
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

function mockRepositoryFactory(): MockType<Repository<any>> {
  return {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };
}
