import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let userService: UsersService;
  let model: Model<User>;

  const mockUser = {
    _id: '12345',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    age: 30,
    profile: {
      code: 'EMP001',
      name: 'Empleado',
    },
  };

  const mockUserService = {
    findById: jest.fn(),
    exec: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await userService.findOne(mockUser._id);

      expect(model.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockUser]),
      } as any);

      const result = await userService.findAll();

      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const newUser = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        age: 30,
        profile: {
          code: 'EMP001',
          name: 'Empleado',
        },
      };

      jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockUser as any));

      const result = await userService.create(newUser);

      expect(result).toEqual(mockUser);
      expect(model.create).toHaveBeenCalledWith(newUser);
    });

    it('should throw an error if the email already exists', async () => {
      jest.spyOn(model, 'create').mockRejectedValue({ code: 11000 });

      await expect(userService.create(mockUser)).rejects.toThrow('Email already exists');
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(model, 'create').mockRejectedValue(new Error());

      await expect(userService.create(mockUser)).rejects.toThrow();
    });
  });
});
