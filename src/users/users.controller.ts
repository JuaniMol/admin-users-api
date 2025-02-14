import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExamples } from './users.examples'; // Importa los ejemplos

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({
      status: 201,
      description: 'Usuario creado exitosamente',
      content: {
          'application/json': {
              example: UserExamples.CREATE_USER // Usa el ejemplo
          }
      }
  })
  @ApiResponse({
      status: 409,
      description: 'El email ya existe',
      content: {
          'application/json': {
              example: UserExamples.CONFLICT_ERROR // Usa el ejemplo
          }
      }
  })
  async create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
      status: 200,
      description: 'Lista de usuarios',
      content: {
          'application/json': {
              example: UserExamples.USER_LIST // Usa el ejemplo
          }
      }
  })
  async findAll() {
      return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({
      name: 'id',
      example: '507f1f77bcf86cd799439011',
      description: 'ID del usuario'
  })
  @ApiResponse({
      status: 200,
      description: 'Usuario encontrado',
      content: {
          'application/json': {
              example: UserExamples.USER_DETAIL // Usa el ejemplo
          }
      }
  })
  @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      content: {
          'application/json': {
              example: UserExamples.NOT_FOUND_ERROR // Usa el ejemplo
          }
      }
  })
  async findOne(@Param('id') id: string) {
      return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({
      name: 'id',
      example: '507f1f77bcf86cd799439011',
      description: 'ID del usuario'
  })
  @ApiResponse({
      status: 200,
      description: 'Usuario actualizado',
      content: {
          'application/json': {
              example: UserExamples.UPDATED_USER // Usa el ejemplo
          }
      }
  })
  @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      content: {
          'application/json': {
              example: UserExamples.NOT_FOUND_ERROR // Usa el ejemplo
          }
      }
  })
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
      return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({
      name: 'id',
      example: '507f1f77bcf86cd799439011',
      description: 'ID del usuario'
  })
  @ApiResponse({
      status: 200,
      description: 'Usuario eliminado'
  })
  @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      content: {
          'application/json': {
              example: UserExamples.NOT_FOUND_ERROR // Usa el ejemplo
          }
      }
  })
  async remove(@Param('id') id: string) {
      return this.usersService.remove(id);
  }
}