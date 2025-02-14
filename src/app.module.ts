import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ||'mongodb://localhost:27017/userdb'), // Conexión a MongoDB
    UsersModule, // Registra el módulo de usuarios
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}