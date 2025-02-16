# Users API

API REST construida con NestJS y MongoDB para la gestión de usuarios.

## Requisitos Previos

Es muy importante tener Docker instalado. En Windows, se requiere Docker Desktop.

- Docker
- Node.js

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/JuaniMol/admin-users-api
cd admin-users-api
```

## Ejecución con Docker

1. Levantar el contenedor con sus servicios:
```bash
npm run docker:dev
```
2. Acceder a la documentación en [http://localhost:3000/api/](http://localhost:3000/api/)

3. La API está lista para usar. Se recomienda usar ThunderClient como cliente HTTP

## Realizar Tests E2E

1. Levantar el contenedor con sus servicios:
```bash
npm run docker:test:watch
```

2. Revisar la consola para verificar los resultados de los tests E2E

## Realizar Tests Unitarios

1. Instalar las dependencias del proyecto:
```bash
npm install
```

2. Ejecutar todos los tests unitarios:
```bash
npm run test
```

3. Opcionalmente, se pueden ejecutar los tests usando la extensión Jest para VSCode en el archivo `users.service.spec.ts`

## Decisiones de Implementación

1. Base de datos MongoDB:
    - Se optó por una instancia local dockerizada en lugar de MongoDB Atlas
    - Esta decisión facilita la implementación del docker-compose y la conexión entre servicios dockerizados

2. Validaciones:
    - Se utilizó class-validator por su popularidad y facilidad de uso
    - Proporciona las validaciones más comunes de forma declarativa

3. Testing:
    - Se implementaron tests E2E además de los tests unitarios requeridos
    - Esto proporciona una cobertura más completa del código

4. Documentación:
    - Se implementó Swagger integrado con NestJS
    - Los decoradores en `users.controller.ts` facilitan la documentación
    - Se refactorizó el código de ejemplos en `users.examples.ts` para mejorar la legibilidad

5. Persistencia en Tests:
    - Se utiliza un volumen separado para los tests E2E
    - Esto permite mantener la persistencia en el entorno de desarrollo sin interferencias