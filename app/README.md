# Order CRUD API

API REST para gestión de órdenes sobre DynamoDB.

## Requisitos

- Node.js 22.x
- npm 10.x
- AWS credentials configuradas (variables de entorno o archivo ~/.aws/credentials)

## Instalación

```bash
npm install
```

## Configuración

Las variables de entorno se configuran en un archivo `.env` en la raíz del proyecto. Vars requeridas:

```
AWS_REGION=us-east-1
DYNAMODB_TABLE_NAME=orders
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_ENDPOINT=http://localhost:8000
PORT=3000
NODE_ENV=development
```

Para desarrollo local con DynamoDB local:
```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción (primero build)
npm run build
npm start
```

El servidor inicia en http://localhost:3000

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/orders | Crear orden |
| GET | /api/orders | Listar órdenes |
| GET | /api/orders/:id | Obtener orden por ID |
| PUT | /api/orders/:id | Actualizar orden |
| DELETE | /api/orders/:id | Eliminar orden |

## Validación

La API valida requests usando express-validator. Esquemas disponibles en `src/utils/validationSchemas.ts`.

Errores 400 para datos inválidos, 404 para orden no encontrada, 500 para errores internos.

## Pruebas

```bash
# Unitarias
npm run test:unit

# Integración
npm run test:integration

# Todas
npm test
```

## Estructura

```
src/
├── main.ts                 # Entry point
├── app.ts                  # Configuración Express
├── domain/
│   ├── models/             # Entidades y DTOs
│   └── repositories/       # Interfaces de repositorio
├── application/
│   └── services/           # Casos de uso
└── infrastructure/
    ├── controllers/        # Controladores REST
    ├── repositories/       # Implementaciones repositorio
    ├── middleware/         # Middleware Express
    └── config/             # Configuración AWS
```

## Build

```bash
npm run build
```

Genera salida en `dist/`