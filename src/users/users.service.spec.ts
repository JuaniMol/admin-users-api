import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let userService: UsersService;
  let model: Model<User>;

  // Mock de un usuario
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

  // Mock del servicio de usuarios
  const mockUserService = {
    findById: jest.fn(),
    exec: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  // Configuración de la prueba
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

    // Inyección de dependencias
    userService = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      // 1. Mock del método findById
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      // 2. Llamada al método que queremos probar
      const result = await userService.findOne(mockUser._id);

      // 3. Verificación de resultados
      expect(model.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // 1. Mock del método find
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockUser]),
      } as any);

      // 2. Llamada al método que queremos probar
      const result = await userService.findAll();

      // 3. Verificación de resultados
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      // 1. Datos de prueba que recibirá la función
      const newUser = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        age: 30,
        profile: {
          code: 'EMP001',
          name: 'Empleado',
        },
      };

      // 2. Mock del método create
      jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockUser as any));

      // 3. Llamada al método que queremos probar
      const result = await userService.create(newUser);

      // 4. Verificación de resultados
      expect(result).toEqual(mockUser);
      expect(model.create).toHaveBeenCalledWith(newUser);
    });

    it('should throw an error if the email already exists', async () => {
      // 1. Mock del método create para simular error de duplicado
      jest.spyOn(model, 'create').mockRejectedValue({ code: 11000 });

      // 2. Verificación del error esperado
      await expect(userService.create(mockUser)).rejects.toThrow('Email already exists');
    });

    it('should throw an error if an error occurs', async () => {
      // 1. Mock del método create para simular error genérico
      jest.spyOn(model, 'create').mockRejectedValue(new Error());

      // 2. Verificación del error esperado
      await expect(userService.create(mockUser)).rejects.toThrow();
    });
  });

});
