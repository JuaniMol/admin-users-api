import { ApiProperty } from '@nestjs/swagger'; // Para documentación con Swagger
import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  ValidateNested,
  IsString,
} from 'class-validator'; // Validadores
import { Type } from 'class-transformer'; // Para transformar datos anidados

// DTO para el perfil del usuario
class ProfileDto {
  @ApiProperty({ example: 'EMP001', description: 'Código del perfil' })
  @IsNotEmpty({ message: 'El código del perfil es obligatorio' })
  @IsString({ message: 'El código del perfil debe ser una cadena de texto' })
  code: string;

  @ApiProperty({ example: 'Empleado', description: 'Nombre del perfil' })
  @IsNotEmpty({ message: 'El nombre del perfil es obligatorio' })
  @IsString({ message: 'El nombre del perfil debe ser una cadena de texto' })
  name: string;
}

// DTO para crear un usuario
export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del usuario' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @ApiProperty({ example: 'juan@example.com', description: 'Correo electrónico' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({ example: 30, description: 'Edad del usuario' })
  @IsNotEmpty({ message: 'La edad es obligatoria' })
  @IsNumber({}, { message: 'La edad debe ser un número' })
  age: number;

  @ApiProperty({ type: ProfileDto, description: 'Perfil del usuario' })
  @IsNotEmpty({ message: 'El perfil es obligatorio' })
  @ValidateNested() // Valida el objeto anidado
  @Type(() => ProfileDto) // Transforma el objeto anidado
  profile: ProfileDto;
}