import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('Users API (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dbConnection = moduleFixture.get<Connection>(getConnectionToken());
    await dbConnection.dropDatabase();
    await app.init();
  });

  afterEach(async () => {
    await dbConnection.close(); // Cierra la conexión después de cada prueba
  });

  afterAll(async () => {
    await app.close(); // Cierra la aplicación
  });

  describe('Endpoints de Usuarios', () => {
    // Usuario de prueba que se utilizará en múltiples pruebas
    const testUser = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP001',
        name: 'Empleado',
      },
    };

    it('/users (POST) - debería crear un nuevo usuario', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(testUser)
        .expect(201);

      // Verificar que la estructura de la respuesta coincida con lo esperado
      expect(response.body).toMatchObject({
        _id: expect.any(String),
        name: testUser.name,
        email: testUser.email,
        age: testUser.age,
        profile: {
          code: testUser.profile.code,
          name: testUser.profile.name
        }
      });
    });

    it('/users (GET) - debería obtener todos los usuarios', () => {
      // Verificar que se devuelva un array y que si hay usuarios, tengan la propiedad profile
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('profile');
          }
        });
    });

    it('/users/:id (GET) - debería obtener un usuario por su ID', async () => {
      // Primero crear un usuario para luego buscarlo
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(testUser);

      const userId = createResponse.body._id;

      // Luego obtener el usuario por su ID y verificar los datos
      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            _id: userId,
            name: testUser.name,
            email: testUser.email,
            age: testUser.age,
            profile: {
              code: testUser.profile.code,
              name: testUser.profile.name
            }
          });
        });
    });

    it('/users/:id (DELETE) - debería eliminar un usuario', async () => {
      // Crear un usuario para luego eliminarlo
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(testUser);

      const userId = createResponse.body._id;

      // Verificar que la eliminación sea exitosa
      return request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200);
    });

    it('/users/:id (PUT) - debería actualizar un usuario', async () => {
      // Crear un usuario para luego actualizarlo
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(testUser);

      const userId = createResponse.body._id;

      const updatedUserData = {
        name: 'Juan Pérez II',
        email: 'juan2@example.com',
        age: 35,
        profile: {
          code: 'EMP002',
          name: 'Empleado II',
        },
      };

      // Verificar que la actualización sea exitosa
      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send(updatedUserData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            _id: userId,
            name: updatedUserData.name,
            email: updatedUserData.email,
            age: updatedUserData.age,
            profile: {
              code: updatedUserData.profile.code,
              name: updatedUserData.profile.name
            }
          });
        });
    });
  });
});
