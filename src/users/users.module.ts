import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registra el esquema de usuario
  ],
  controllers: [UsersController], // Registra el controlador
  providers: [UsersService], // Registra el servicio
})
export class UsersModule {}