import { ApiTags, ApiOperation, ApiResponse, getSchemaPath, ApiParam } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente',
      content: {
        'application/json': {
          example: 
            {
              name: "Juan Pérez",
              email: "juan@example.com",
              age: 30,
              profile: {
                code: "EMP001",
                name: "Empleado",
                _id: "67af8130868574efdd0bbafa"
              },
              _id: "67af8130868574efdd0bbaf9",
              __v: 0
            }
          }
        }
      })
    @ApiResponse({ status: 409, description: 'El email ya existe',
      content: {
        'application/json': {
          example: {
            message: "Email already exists",
            error: "Conflict",
            statusCode: 409
          }
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
                example: [{
                    _id: '507f1f77bcf86cd799439011',
                    name: 'Juan Pérez',
                    email: 'juan@example.com',
                    age: 30,
                    profile: {
                        code: 'EMP001',
                        name: 'Empleado'
                    }
                }]
            }
        }
    })
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', example: '507f1f77bcf86cd799439011', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado',
        content: {
            'application/json': {
                example: {
                    _id: '507f1f77bcf86cd799439011',
                    name: 'Juan Pérez',
                    email: 'juan@example.com',
                    age: 30,
                    profile: {
                        code: 'EMP001',
                        name: 'Empleado'
                    }
                    
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Usuario no encontrado',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: 'User not found',
                    error: 'Not Found'
                }
            }
        }
    })
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiParam({ name: 'id', example: '507f1f77bcf86cd799439011', description: 'ID del usuario' })
    @ApiResponse({
      status: 200,
      description: 'Usuario actualizado',
      content: {
        'application/json': {
          example: {
            _id: '507f1f77bcf86cd799439011',
            name: 'Juan Pérez',
            email: 'juan@example.com',
            age: 30,
            profile: {
              code: 'EMP001',
              name: 'Empleado',
              _id: '67af8130868574efdd0bbafa'
            },
            __v: 0
          }
        }
      }
    })
    @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      content: {
        'application/json': {
          example: {
            statusCode: 404,
            message: 'User not found',
            error: 'Not Found'
          }
        }
      }
    })
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiParam({ name: 'id', example: '507f1f77bcf86cd799439011', description: 'ID del usuario' })
    @ApiResponse({
      status: 200,
      description: 'Usuario eliminado',
    })
    @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      content: {
        'application/json': {
          example: {
            statusCode: 404,
            message: 'User not found',
            error: 'Not Found'
          }
        }
      }
    })
    async remove(@Param('id') id: string) {
      return this.usersService.remove(id);
    }
}