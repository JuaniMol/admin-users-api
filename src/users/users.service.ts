import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

// Servicio que maneja las operaciones CRUD para usuarios
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Crea un nuevo usuario
  // Si el email ya existe, lanza una excepción de conflicto
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
        const createdUser = await this.userModel.create(createUserDto);
        return createdUser;
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictException('Email already exists');
        }
        throw error;
    }
  }

  // Obtiene todos los usuarios de la base de datos
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Busca un usuario por su ID
  // Si no existe, lanza una excepción de no encontrado
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Actualiza un usuario existente por su ID
  // Si no existe, lanza una excepción de no encontrado
  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  // Elimina un usuario por su ID
  // Si no existe, lanza una excepción de no encontrado
  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }
}