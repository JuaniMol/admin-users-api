# Users API

API REST construida con NestJS y MongoDB para la gestión de usuarios.

## Requisitos Previos

Es muy importante tener Docker instalado, en mi caso para Windows instale Docker Desktop

- Docker
- Node.js (opcional, solo para desarrollo local)

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/JuaniMol/admin-users-api
cd admin-users-api
```

## Ejecución con Docker

1. Levantar el contenedor con sus servicios
```bash
npm run docker:dev
```
2. Ver la documentación en [http://localhost:3000/api/](http://localhost:3000/api/)

3. Ya puedes usar la API, yo personalmente uso la extensión ThunderClient

## Realizar Test E2E
1. Levantar el contenedor con sus servicios
```bash
npm run docker:test:watch
```

2. Revisar la consola y verificar el resultado del test E2E

## Realizar Tests Unitarios

1. Como se hacen localmente debes instalar los paquetes de node

```bash
npm install
```

2. Podemos probar todos los test unitarios al mismo tiempo así:

```bash
npm run test
```
3. Se puede probar con la extensión de Jest para VSCode dentro del archivo `users.service.spec.ts`

## Decisiones importantes

1. Para hacer la MongoDB tenia dos opciones:
    - Usar una bd en la nube como lo es MongoAtlas
    - Usar una instancia local de mongoDB

    Decidi usar instancia local y dockerizada, me parece mas interesante para implementar docker-compose y conectar los dos servicios dockerizados

2. Para las validaciones elegí usar class-validator. Es una libreria muy popular que facilita las validaciones más populares.

3. Decidi hacer un test E2E. Es algo que no se pide, pero ya que aprendi a hacer test unitarios investigué un poco más y me parecio interesante agregarlo.

4. Para la documentacion use Swagger integrado de NestJS, con decoradores en el `users.controller.ts` se puede documentar facilmente. Lo unico que no me gusta es que tuve que refactorizar en el archivo `users.examples.ts` por que quedaba muy sucio el codigo y perdia legibilidad.

5. Para el test e2e usé un volumen diferente para guardar la informacion temporal de cada test. Esto con el objetivo de mantener la persistencia en el entorno dev.