# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `app/test/unit/OrderService.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `app/test/integration/OrderController.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd app && npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /api/orders`
  - `GET /api/orders/:id`
  - `PUT /api/orders/:id`
  - `DELETE /api/orders/:id`
  - `GET /api/orders`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **app/src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

## Como saber que terminaste

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261110090352996), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de ordenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y creación de la tabla DynamoDB — objetivo: Configurar el entorno de desarrollo y crear la tabla DynamoDB para almacenar las órdenes. — entregable (NO resolver): Entorno de desarrollo configurado y tabla DynamoDB creada.
- Fase 2: Implementación de las operaciones CRUD — objetivo: Implementar las operaciones CRUD (Create, Read, Update, Delete) sobre la tabla DynamoDB. — entregable (NO resolver): Operaciones CRUD implementadas y funcionales en la API REST.
- Fase 3: Pruebas y optimización — objetivo: Realizar pruebas exhaustivas de las operaciones CRUD y optimizar el rendimiento de la API REST. — entregable (NO resolver): Pruebas unitarias y de integración completas, API REST optimizada.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/package.json ===
{
  "name": "order-crud-api",
  "version": "1.0.0",
  "description": "API REST para gestión de órdenes sobre DynamoDB",
  "main": "src/main.ts",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "lint": "eslint . --ext .ts",
    "prebuild": "npm run lint"
  },
  "keywords": [],
  "author": "Pragma",
  "license": "ISC",
  "dependencies": {
    "express": "4.21.0",
    "@aws-sdk/client-dynamodb": "3.609.0",
    "@aws-sdk/lib-dynamodb": "3.609.0",
    "express-validator": "7.1.0",
    "dotenv": "16.4.5"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/jest": "29.5.12",
    "@types/supertest": "6.0.2",
    "jest": "29.7.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "typescript": "5.7.2",
    "ts-node": "10.9.2",
    "eslint": "8.57.0",
    "@typescript-eslint/parser": "7.18.0",
    "@typescript-eslint/eslint-plugin": "7.18.0"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": ["ts", "js", "json", "node"],
    "testMatch": ["**/*.test.ts"]
  }
}

// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@utils/*": ["src/utils/*"],
      "@test/*": ["test/*"]
    }
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: app/src/domain/models/Order.ts ===
export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderDTO {
    id?: string;
    customerId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
        name: string;
    }[];
    status?: OrderStatus;
    totalAmount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export const OrderStatusValues: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export function calculateTotalAmount(items: OrderItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function validateOrderStatus(status: string): status is OrderStatus {
    return OrderStatusValues.includes(status as OrderStatus);
}

// === ARCHIVO: app/src/domain/repositories/OrderRepository.ts ===
import { Order, OrderDTO } from '../models/Order';

export interface IOrderRepository {
    create(order: OrderDTO): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: OrderDTO): Promise<Order>;
    delete(id: string): Promise<void>;
    list(): Promise<Order[]>;
}

// === ARCHIVO: app/src/infrastructure/repositories/DynamoOrderRepository.ts ===
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
    ScanCommand
} from '@aws-sdk/lib-dynamodb';
import { Order, OrderDTO, OrderStatus, calculateTotalAmount } from '@domain/models/Order';
import { IOrderRepository } from '@domain/repositories/OrderRepository';
import { InternalServerError } from '@utils/errors';

export class DynamoOrderRepository implements IOrderRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        const dynamoDBClient = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
            credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
                ? {
                      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                  }
                : undefined
        });
        this.client = DynamoDBDocumentClient.from(dynamoDBClient);
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Orders';
    }

    async create(orderDTO: OrderDTO): Promise<Order> {
        if (!orderDTO.customerId || !orderDTO.items || orderDTO.items.length === 0) {
            throw new Error('Customer ID and items are required');
        }

        const now = new Date().toISOString();
        const order: Order = {
            id: orderDTO.id || this.generateId(),
            customerId: orderDTO.customerId,
            items: orderDTO.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name
            })),
            status: orderDTO.status || 'PENDING',
            totalAmount: orderDTO.totalAmount || calculateTotalAmount(orderDTO.items),
            createdAt: now,
            updatedAt: now
        };

        const params = {
            TableName: this.tableName,
            Item: order
        };

        try {
            await this.client.send(new PutCommand(params));
            return order;
        } catch (error) {
            throw new InternalServerError(`Failed to create order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findById(id: string): Promise<Order | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        try {
            const result = await this.client.send(new GetCommand(params));
            return result.Item ? this.mapDynamoItemToOrder(result.Item) : null;
        } catch (error) {
            throw new InternalServerError(`Failed to find order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async update(id: string, orderDTO: OrderDTO): Promise<Order> {
        if (!orderDTO.items || orderDTO.items.length === 0) {
            throw new Error('Items are required');
        }

        const now = new Date().toISOString();
        const updateExpressionParts: string[] = [
            '#status = :status',
            '#totalAmount = :totalAmount',
            '#updatedAt = :updatedAt'
        ];
        const expressionAttributeNames: Record<string, string> = {
            '#status': 'status',
            '#totalAmount': 'totalAmount',
            '#updatedAt': 'updatedAt'
        };
        const expressionAttributeValues: Record<string, any> = {
            ':status': orderDTO.status || 'PENDING',
            ':totalAmount': calculateTotalAmount(orderDTO.items),
            ':updatedAt': now
        };

        if (orderDTO.items) {
            updateExpressionParts.push('#items = :items');
            expressionAttributeNames['#items'] = 'items';
            expressionAttributeValues[':items'] = orderDTO.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name
            }));
        }

        const params = {
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW' as const
        };

        try {
            const result = await this.client.send(new UpdateCommand(params));
            if (!result.Attributes) {
                throw new Error('Order not found');
            }
            return this.mapDynamoItemToOrder(result.Attributes);
        } catch (error) {
            throw new InternalServerError(`Failed to update order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async delete(id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        try {
            await this.client.send(new DeleteCommand(params));
        } catch (error) {
            throw new InternalServerError(`Failed to delete order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async list(): Promise<Order[]> {
        const params = {
            TableName: this.tableName
        };

        try {
            const result = await this.client.send(new ScanCommand(params));
            return result.Items ? result.Items.map(item => this.mapDynamoItemToOrder(item)) : [];
        } catch (error) {
            throw new InternalServerError(`Failed to list orders: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private mapDynamoItemToOrder(item: Record<string, any>): Order {
        return {
            id: item.id,
            customerId: item.customerId,
            items: item.items.map((i: Record<string, any>) => ({
                productId: i.productId,
                quantity: i.quantity,
                price: i.price,
                name: i.name
            })),
            status: item.status as OrderStatus,
            totalAmount: item.totalAmount,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    }
}

// === ARCHIVO: app/src/application/services/OrderService.ts ===
import { IOrderRepository } from '../../domain/repositories/OrderRepository';
import { Order, OrderDTO, OrderStatus } from '../../domain/models/Order';

export class OrderService {
  private readonly repository: IOrderRepository;

  constructor(repository: IOrderRepository) {
    this.repository = repository;
  }

  async createOrder(dto: OrderDTO): Promise<Order> {
    if (!dto.customerId || dto.customerId.trim().length === 0) {
      throw new Error('Customer ID is required');
    }

    if (!dto.items || dto.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    for (const item of dto.items) {
      if (!item.productId || item.productId.trim().length === 0) {
        throw new Error('Each order item must have a product ID');
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error('Item quantity must be greater than zero');
      }
      if (!item.price || item.price < 0) {
        throw new Error('Item price must be non-negative');
      }
    }

    const totalAmount = this.calculateTotal(dto.items);
    const orderDTO: OrderDTO = {
      ...dto,
      status: dto.status || 'PENDING' as OrderStatus,
      totalAmount,
    };

    return this.repository.create(orderDTO);
  }

  async getOrder(id: string): Promise<Order | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    return this.repository.findById(id);
  }

  async updateOrder(id: string, dto: OrderDTO): Promise<Order> {
    if (!id || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    const existingOrder = await this.repository.findById(id);
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (dto.status) {
      const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
      if (!validStatuses.includes(dto.status)) {
        throw new Error(`Invalid order status: ${dto.status}`);
      }

      if (existingOrder.status === 'CANCELLED' && dto.status !== 'CANCELLED') {
        throw new Error('Cannot change status of a cancelled order');
      }

      if (existingOrder.status === 'DELIVERED') {
        throw new Error('Cannot modify a delivered order');
      }
    }

    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        if (!item.productId || item.productId.trim().length === 0) {
          throw new Error('Each order item must have a product ID');
        }
        if (!item.quantity || item.quantity <= 0) {
          throw new Error('Item quantity must be greater than zero');
        }
        if (!item.price || item.price < 0) {
          throw new Error('Item price must be non-negative');
        }
      }

      const totalAmount = this.calculateTotal(dto.items);
      dto.totalAmount = totalAmount;
    }

    const updatedDTO: OrderDTO = {
      ...existingOrder,
      ...dto,
      id: existingOrder.id,
    };

    return this.repository.update(id, updatedDTO);
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    const existingOrder = await this.repository.findById(id);
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (existingOrder.status === 'DELIVERED') {
      throw new Error('Cannot delete a delivered order');
    }

    return this.repository.delete(id);
  }

  async listOrders(): Promise<Order[]> {
    return this.repository.list();
  }

  private calculateTotal(items: Array<{ price: number; quantity: number }>): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

// === ARCHIVO: app/src/infrastructure/controllers/OrderController.ts ===
import express, { Request, Response, NextFunction } from 'express';
import { IOrderRepository } from '../../domain/repositories/OrderRepository';
import { OrderDTO } from '../../domain/models/Order';

export class OrderController {
    private readonly repository: IOrderRepository;

    constructor(repository: IOrderRepository) {
        this.repository = repository;
    }

    async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderDTO: OrderDTO = req.body;
            
            if (!orderDTO.customerId || !orderDTO.items || orderDTO.items.length === 0) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'customerId and items are required'
                });
                return;
            }

            const createdOrder = await this.repository.create(orderDTO);
            res.status(201).json(createdOrder);
        } catch (error) {
            next(error);
        }
    }

    async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'Order ID is required'
                });
                return;
            }

            const order = await this.repository.findById(id);
            
            if (!order) {
                res.status(404).json({
                    error: 'Not found',
                    message: `Order with ID ${id} not found`
                });
                return;
            }

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const orderDTO: OrderDTO = req.body;

            if (!id) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'Order ID is required'
                });
                return;
            }

            const existingOrder = await this.repository.findById(id);
            if (!existingOrder) {
                res.status(404).json({
                    error: 'Not found',
                    message: `Order with ID ${id} not found`
                });
                return;
            }

            const updatedOrder = await this.repository.update(id, orderDTO);
            res.status(200).json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'Order ID is required'
                });
                return;
            }

            const existingOrder = await this.repository.findById(id);
            if (!existingOrder) {
                res.status(404).json({
                    error: 'Not found',
                    message: `Order with ID ${id} not found`
                });
                return;
            }

            await this.repository.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async listOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = await this.repository.list();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    getRouter(): express.Router {
        const router = express.Router();
        
        router.post('/', this.createOrder.bind(this));
        router.get('/:id', this.getOrder.bind(this));
        router.put('/:id', this.updateOrder.bind(this));
        router.delete('/:id', this.deleteOrder.bind(this));
        router.get('/', this.listOrders.bind(this));
        
        return router;
    }
}

// === ARCHIVO: app/src/infrastructure/config/dynamoConfig.ts ===
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

const getDynamoDBClientConfig = (): DynamoDBClient => {
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const region = process.env.AWS_REGION || 'us-east-1';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    const clientConfig: any = {
        region,
    };

    if (endpoint) {
        clientConfig.endpoint = endpoint;
        clientConfig.tls = false;
    }

    if (accessKeyId && secretAccessKey) {
        clientConfig.credentials = {
            accessKeyId,
            secretAccessKey,
        };
    }

    return new DynamoDBClient(clientConfig);
};

const getDocumentClientConfig = (): DynamoDBDocumentClientConfig => {
    const client = getDynamoDBClientConfig();
    
    const marshallOptions = {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    };

    const unmarshallOptions = {
        wrapNumbers: false,
    };

    const translateConfig = {
        marshallOptions,
        unmarshallOptions,
    };

    return {
        client,
        ...translateConfig,
    };
};

export const createDynamoDBDocumentClient = (): DynamoDBDocumentClient => {
    const config = getDocumentClientConfig();
    return DynamoDBDocumentClient.from(config);
};

export const getTableName = (): string => {
    const tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
    return tableName;
};

export const getDynamoDBClient = (): DynamoDBClient => {
    return getDynamoDBClientConfig();
};

// === ARCHIVO: app/src/infrastructure/middleware/errorHandler.ts ===
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const createError = (message: string, statusCode: number): AppError => {
    const error: AppError = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[ERROR] ${err.name}: ${message}`);
    console.error(`[ERROR] Stack: ${err.stack}`);

    if (err.name === 'ValidationError') {
        res.status(400).json({
            error: 'Validation Error',
            message: message,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing authentication token',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'ForbiddenError') {
        res.status(403).json({
            error: 'Forbidden',
            message: 'Insufficient permissions to access this resource',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'NotFoundError') {
        res.status(404).json({
            error: 'Not Found',
            message: message,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'ConflictError') {
        res.status(409).json({
            error: 'Conflict',
            message: message,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'ThrottlingError') {
        res.status(429).json({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'DynamoDBError' || err.name === 'AWSError') {
        res.status(503).json({
            error: 'Service Unavailable',
            message: 'Database operation failed. Please try again later.',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (statusCode === 500) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    res.status(statusCode).json({
        error: err.name || 'Error',
        message: message,
        timestamp: new Date().toISOString(),
    });
};

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
    });
};

// === ARCHIVO: app/src/utils/validationSchemas.ts ===
import { body, param, query, ValidationChain } from 'express-validator';

const OrderStatusValues = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export const createOrderSchema: ValidationChain[] = [
  body('customerId')
    .trim()
    .notEmpty()
    .withMessage('El ID del cliente es obligatorio')
    .isString()
    .withMessage('El ID del cliente debe ser una cadena de texto')
    .isLength({ min: 1, max: 100 })
    .withMessage('El ID del cliente debe tener entre 1 y 100 caracteres'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un artículo en la orden'),
  body('items.*.productId')
    .trim()
    .notEmpty()
    .withMessage('El ID del producto es obligatorio')
    .isString()
    .withMessage('El ID del producto debe ser una cadena'),
  body('items.*.name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio')
    .isString()
    .withMessage('El nombre del producto debe ser una cadena'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  body('status')
    .optional()
    .isIn(OrderStatusValues)
    .withMessage(`El estado debe ser uno de: ${OrderStatusValues.join(', ')}`),
  body('totalAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El monto total debe ser un número mayor o igual a 0'),
];

export const updateOrderSchema: ValidationChain[] = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('El ID de la orden es obligatorio')
    .isString()
    .withMessage('El ID debe ser una cadena de texto'),
  body('customerId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El ID del cliente no puede estar vacío')
    .isString()
    .withMessage('El ID del cliente debe ser una cadena'),
  body('items')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un artículo'),
  body('items.*.productId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El ID del producto es obligatorio'),
  body('items.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio'),
  body('items.*.quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser mayor a 0'),
  body('items.*.price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser mayor o igual a 0'),
  body('status')
    .optional()
    .isIn(OrderStatusValues)
    .withMessage(`El estado debe ser uno de: ${OrderStatusValues.join(', ')}`),
  body('totalAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El monto total debe ser mayor o igual a 0'),
];

export const orderIdParamSchema: ValidationChain[] = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('El ID de la orden es obligatorio')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
    .isLength({ min: 1, max: 100 })
    .withMessage('El ID debe tener entre 1 y 100 caracteres'),
];

export const listOrdersQuerySchema: ValidationChain[] = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un entero entre 1 y 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El offset debe ser un entero mayor o igual a 0'),
  query('status')
    .optional()
    .isIn(OrderStatusValues)
    .withMessage(`El estado debe ser uno de: ${OrderStatusValues.join(', ')}`),
];

export const deleteOrderSchema: ValidationChain[] = orderIdParamSchema;

export const getOrderSchema: ValidationChain[] = orderIdParamSchema;

// === ARCHIVO: app/src/infrastructure/middleware/validation.ts ===
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, Result } from 'express-validator';
import {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  deleteOrderSchema,
  listOrdersQuerySchema
} from '@utils/validationSchemas';

interface ValidationRequest extends Request {
  validationErrors?: Result;
}

export const validateCreateOrder: ValidationChain[] = createOrderSchema;

export const validateUpdateOrder: ValidationChain[] = updateOrderSchema;

export const validateGetOrder: ValidationChain[] = getOrderSchema;

export const validateDeleteOrder: ValidationChain[] = deleteOrderSchema;

export const validateListOrders: ValidationChain[] = listOrdersQuerySchema;

export const handleValidation = (
  req: ValidationRequest,
  res: Response,
  next: NextFunction
): void => {
  const errors: Result = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: 'path' in err ? err.path : 'unknown',
      message: err.msg,
      value: 'value' in err ? err.value : undefined,
    }));
    
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: formattedErrors,
    });
    return;
  }
  
  next();
};

export const createValidationMiddleware = (validations: ValidationChain[]) => {
  return [
    ...validations,
    handleValidation,
  ];
};

// Middleware específico para validar el cuerpo de la orden
// Calcula el totalAmount automáticamente si no se proporciona
export const enrichOrderData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { items, totalAmount } = req.body;
  
  if (items && Array.isArray(items) && !totalAmount) {
    const calculatedTotal = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return sum + itemTotal;
    }, 0);
    
    req.body.totalAmount = Math.round(calculatedTotal * 100) / 100;
  }
  
  next();
};

// Middleware para sanitizar inputs
export const sanitizeInputs = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const sanitizeString = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return value.replace(/[<>]/g, '').trim();
    }
    if (Array.isArray(value)) {
      return value.map(sanitizeString);
    }
    if (value && typeof value === 'object') {
      const sanitized: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(value)) {
        sanitized[key] = sanitizeString(val);
      }
      return sanitized;
    }
    return value;
  };
  
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeString(req.body) as Record<string, unknown>;
  }
  
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeString(req.query) as Record<string, unknown>;
  }
  
  next();
};

// === ARCHIVO: app/README.md ===
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

// === ARCHIVO: app/src/main.ts ===
import 'dotenv/config';
import { createApp } from './app';
import { DynamoOrderRepository } from './infrastructure/repositories/DynamoOrderRepository';
import { getTableName } from './infrastructure/config/dynamoConfig';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function bootstrap(): Promise<void> {
    try {
        const tableName = getTableName();
        console.log(`[MAIN] Iniciando aplicación con tabla: ${tableName}`);

        const repository = new DynamoOrderRepository();
        const app = createApp(repository);

        const server = app.listen(PORT, () => {
            console.log(`[MAIN] Servidor Express escuchando en puerto ${PORT}`);
            console.log(`[MAIN] Endpoints disponibles:`);
            console.log(`  POST   /api/orders`);
            console.log(`  GET    /api/orders/:id`);
            console.log(`  PUT    /api/orders/:id`);
            console.log(`  DELETE /api/orders/:id`);
            console.log(`  GET    /api/orders`);
        });

        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`[MAIN] Error: El puerto ${PORT} ya está en uso`);
                process.exit(1);
            }
            throw error;
        });
    } catch (error) {
        console.error('[MAIN] Error crítico al iniciar la aplicación:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    bootstrap();
}

export { bootstrap };

// === ARCHIVO: app/src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import { OrderController } from './infrastructure/controllers/OrderController';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import { IOrderRepository } from './domain/repositories/OrderRepository';

export function createApp(repository: IOrderRepository): Application {
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  const orderController = new OrderController(repository);
  const orderRouter = orderController.getRouter();
  app.use('/api/orders', orderRouter);
  
  app.use(errorHandler);
  
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
  
  return app;
}

// === ARCHIVO: app/test/unit/OrderService.test.ts ===
import { OrderService } from '../../src/application/services/OrderService';
import { IOrderRepository } from '../../src/domain/repositories/OrderRepository';
import { OrderDTO, OrderStatus } from '../../src/domain/models/Order';

describe('OrderService', () => {
  let orderService: OrderService;
  let mockRepository: jest.Mocked<IOrderRepository>;
  
  const mockOrderDTO: OrderDTO = {
    customerId: 'CUST-001',
    items: [
      { productId: 'PROD-001', quantity: 2, price: 50.00, name: 'Producto A' }
    ],
    status: 'PENDING'
  };
  
  const mockOrder = {
    id: 'ORDER-123',
    customerId: 'CUST-001',
    items: [
      { productId: 'PROD-001', quantity: 2, price: 50.00, name: 'Producto A' }
    ],
    status: 'PENDING' as OrderStatus,
    totalAmount: 100.00,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn()
    };
    orderService = new OrderService(mockRepository);
  });

  describe('createOrder', () => {
    it('debe crear una orden exitosamente', async () => {
      mockRepository.create.mockResolvedValue(mockOrder);
      
      const result = await orderService.createOrder(mockOrderDTO);
      
      expect(mockRepository.create).toHaveBeenCalledWith(mockOrderDTO);
    });

    it('debe calcular el totalAmount automáticamente', async () => {
      mockRepository.create.mockResolvedValue(mockOrder);
      
      await orderService.createOrder(mockOrderDTO);
      
      const calledDTO = mockRepository.create.mock.calls[0][0];
      expect(calledDTO.totalAmount).toBe(100.00);
    });

    it('debe asignar estado PENDING por defecto', async () => {
      mockRepository.create.mockResolvedValue(mockOrder);
      
      await orderService.createOrder({ ...mockOrderDTO, status: undefined });
      
      const calledDTO = mockRepository.create.mock.calls[0][0];
      expect(calledDTO.status).toBe('PENDING');
    });

    it('debe lanzar error si customerId está vacío', async () => {
      const invalidDTO = { ...mockOrderDTO, customerId: '' };
      
      await expect(orderService.createOrder(invalidDTO)).rejects.toThrow();
    });

    it('debe lanzar error si items está vacío', async () => {
      const invalidDTO = { ...mockOrderDTO, items: [] };
      
      await expect(orderService.createOrder(invalidDTO)).rejects.toThrow();
    });
  });

  describe('getOrder', () => {
    it('debe obtener una orden por id', async () => {
      mockRepository.findById.mockResolvedValue(mockOrder);
      
      const result = await orderService.getOrder('ORDER-123');
      
      expect(mockRepository.findById).toHaveBeenCalledWith('ORDER-123');
    });

    it('debe retornar null si la orden no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);
      
      const result = await orderService.getOrder('NON-EXISTENT');
      
      expect(result).toBeNull();
    });
  });

  describe('updateOrder', () => {
    it('debe actualizar una orden existente', async () => {
      const updatedOrder = { ...mockOrder, status: 'SHIPPED' as OrderStatus };
      mockRepository.update.mockResolvedValue(updatedOrder);
      
      const result = await orderService.updateOrder('ORDER-123', mockOrderDTO);
      
      expect(mockRepository.update).toHaveBeenCalledWith('ORDER-123', mockOrderDTO);
    });

    it('debe recalcular totalAmount si los items cambian', async () => {
      const newDTO = {
        ...mockOrderDTO,
        items: [
          { productId: 'PROD-002', quantity: 1, price: 200.00, name: 'Producto B' }
        ]
      };
      mockRepository.update.mockResolvedValue({ ...mockOrder, totalAmount: 200.00 });
      
      await orderService.updateOrder('ORDER-123', newDTO);
      
      const calledDTO = mockRepository.update.mock.calls[0][1];
      expect(calledDTO.totalAmount).toBe(200.00);
    });
  });

  describe('deleteOrder', () => {
    it('debe eliminar una orden por id', async () => {
      mockRepository.delete.mockResolvedValue();
      
      await orderService.deleteOrder('ORDER-123');
      
      expect(mockRepository.delete).toHaveBeenCalledWith('ORDER-123');
    });
  });

  describe('listOrders', () => {
    it('debe listar todas las órdenes', async () => {
      const orders = [mockOrder, { ...mockOrder, id: 'ORDER-456' }];
      mockRepository.list.mockResolvedValue(orders);
      
      const result = await orderService.listOrders();
      
      expect(mockRepository.list).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    });

    it('debe retornar array vacío si no hay órdenes', async () => {
      mockRepository.list.mockResolvedValue([]);
      
      const result = await orderService.listOrders();
      
      expect(result).toEqual([]);
    });
  });

  describe('transiciones de estado válidas', () => {
    it('debe permitir transición de PENDING a PROCESSING', async () => {
      const orderInProcess = { ...mockOrder, status: 'PROCESSING' as OrderStatus };
      mockRepository.update.mockResolvedValue(orderInProcess);
      
      const result = await orderService.updateOrder('ORDER-123', {
        ...mockOrderDTO,
        status: 'PROCESSING'
      });
      
      expect(result.status).toBe('PROCESSING');
    });

    it('debe permitir transición de PROCESSING a SHIPPED', async () => {
      const shippedOrder = { ...mockOrder, status: 'SHIPPED' as OrderStatus };
      mockRepository.update.mockResolvedValue(shippedOrder);
      
      const result = await orderService.updateOrder('ORDER-123', {
        ...mockOrderDTO,
        status: 'SHIPPED'
      });
      
      expect(result.status).toBe('SHIPPED');
    });

    it('debe rechazar transición de PENDING directamente a DELIVERED', async () => {
      mockRepository.update.mockRejectedValue(new Error('Transición de estado inválida'));
      
      await expect(orderService.updateOrder('ORDER-123', {
        ...mockOrderDTO,
        status: 'DELIVERED'
      })).rejects.toThrow('Transición de estado inválida');
    });

    it('debe rechazar transición desde CANCELLED', async () => {
      mockRepository.findById.mockResolvedValue({ ...mockOrder, status: 'CANCELLED' as OrderStatus });
      mockRepository.update.mockRejectedValue(new Error('No se puede modificar una orden cancelada'));
      
      await expect(orderService.updateOrder('ORDER-123', mockOrderDTO)).rejects.toThrow();
    });
  });
});

// === ARCHIVO: app/test/integration/OrderController.test.ts ===
import request from 'supertest';
import { Express } from 'express';
import { OrderDTO, OrderStatus } from '../../src/domain/models/Order';

let app: Express;

beforeAll(async () => {
  app = request(require('../../src/app').default);
});

describe('OrderController - Integración', () => {
  const validOrderDTO: OrderDTO = {
    customerId: 'customer-123',
    items: [
      {
        productId: 'product-1',
        quantity: 2,
        price: 10.50,
        name: 'Producto de prueba'
      }
    ],
    status: 'PENDING' as OrderStatus
  };

  describe('POST /api/orders', () => {
    it('debería crear una orden exitosamente', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send(validOrderDTO)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.customerId).toBe(validOrderDTO.customerId);
      expect(response.body.items).toHaveLength(validOrderDTO.items.length);
    });

    it('debería validar datos requeridos', async () => {
      const invalidOrder = { customerId: 'customer-123' };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('debería obtener una orden por ID', async () => {
      const createResponse = await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const orderId = createResponse.body.id;

      const getResponse = await request(app)
        .get(`/api/orders/${orderId}`)
        .expect('Content-Type', /json/);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.id).toBe(orderId);
    });

    it('debería retornar 404 para orden inexistente', async () => {
      const response = await request(app)
        .get('/api/orders/inexistente-id-123')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/orders/:id', () => {
    it('debería actualizar una orden existente', async () => {
      const createResponse = await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const orderId = createResponse.body.id;
      const updatedData = {
        ...validOrderDTO,
        status: 'SHIPPED' as OrderStatus
      };

      const updateResponse = await request(app)
        .put(`/api/orders/${orderId}`)
        .send(updatedData)
        .expect('Content-Type', /json/);

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.status).toBe('SHIPPED');
    });

    it('debería retornar 404 al actualizar orden inexistente', async () => {
      const response = await request(app)
        .put('/api/orders/inexistente-id-456')
        .send(validOrderDTO)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('debería eliminar una orden exitosamente', async () => {
      const createResponse = await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const orderId = createResponse.body.id;

      await request(app)
        .delete(`/api/orders/${orderId}`)
        .expect(204);

      await request(app)
        .get(`/api/orders/${orderId}`)
        .expect(404);
    });

    it('debería retornar 404 al eliminar orden inexistente', async () => {
      const response = await request(app)
        .delete('/api/orders/inexistente-id-789')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/orders', () => {
    it('debería listar todas las ordenes', async () => {
      await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const response = await request(app)
        .get('/api/orders')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

// === ARCHIVO: app/src/utils/errors.ts ===
export class InternalServerError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
        this.isOperational = true;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class ValidationError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.isOperational = true;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class NotFoundError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        this.isOperational = true;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ConflictError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
        this.isOperational = true;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

// === ARCHIVO: infra/providers.tf ===
# Configuración de los proveedores de Terraform para AWS
# Este archivo declara los proveedores necesarios para interactuar con AWS
# y establece las versiones requeridas para garantizar compatibilidad.

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.65.0"
    }
  }
  required_version = ">= 1.7.0"
}

# Configuración del proveedor AWS
# Se configura el proveedor AWS con la región por defecto.
# Las credenciales se obtienen del entorno o del archivo de configuración.
provider "aws" {
  region = var.aws_region
  # Evita la validación estricta de nombres de recursos para permitir
  # nombres con caracteres especiales si es necesario.
  skip_metadata_api_check     = false
  skip_region_validation      = false
  skip_credentials_validation = false
  skip_requesting_account_id  = false

  # Configuración por defecto para las etiquetas de los recursos
  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Project     = var.project_name
    }
  }
}

# Variables globales utilizadas en la configuración del proveedor
variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno donde se desplegarán los recursos (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar los recursos"
  type        = string
  default     = "order-management"
}

// === ARCHIVO: infra/variables.tf ===
# Definición de variables globales para la infraestructura
# Estas variables se utilizan en los módulos y en la configuración principal.

# Variables para la configuración de DynamoDB
variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para almacenar las órdenes"
  type        = string
  default     = "orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación de DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_hash_key" {
  description = "Clave hash (partition key) de la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "dynamodb_range_key" {
  description = "Clave de rango (sort key) de la tabla DynamoDB, si aplica"
  type        = string
  default     = ""
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada para DynamoDB (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada para DynamoDB (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_stream_enabled" {
  description = "Indica si el stream de DynamoDB está habilitado"
  type        = bool
  default     = false
}

variable "dynamodb_stream_view_type" {
  description = "Tipo de vista del stream de DynamoDB (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = ""
}

variable "dynamodb_ttl_attribute" {
  description = "Nombre del atributo utilizado para TTL en DynamoDB"
  type        = string
  default     = "expiry_time"
}

variable "dynamodb_ttl_enabled" {
  description = "Indica si TTL está habilitado en la tabla DynamoDB"
  type        = bool
  default     = false
}

# Variables para etiquetas globales
variable "tags" {
  description = "Etiquetas adicionales para los recursos"
  type        = map(string)
  default     = {}
}

# Variables para la configuración de índices secundarios
variable "dynamodb_gsi" {
  description = "Lista de índices secundarios globales (GSI) para la tabla DynamoDB"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    read_capacity      = number
    write_capacity     = number
    projection_type    = string
    non_key_attributes = list(string)
  }))
  default = []
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables del módulo DynamoDB
# Este archivo define las variables necesarias para configurar la tabla DynamoDB.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación de DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "hash_key" {
  description = "Clave hash (partition key) de la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango (sort key) de la tabla DynamoDB"
  type        = string
  default     = ""
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada para DynamoDB (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada para DynamoDB (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "stream_enabled" {
  description = "Indica si el stream de DynamoDB está habilitado"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream de DynamoDB (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = ""
}

variable "ttl_attribute" {
  description = "Nombre del atributo utilizado para TTL en DynamoDB"
  type        = string
  default     = "expiry_time"
}

variable "ttl_enabled" {
  description = "Indica si TTL está habilitado en la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "gsi" {
  description = "Lista de índices secundarios globales (GSI) para la tabla DynamoDB"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    read_capacity      = number
    write_capacity     = number
    projection_type    = string
    non_key_attributes = list(string)
  }))
  default = []
}

variable "tags" {
  description = "Etiquetas adicionales para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "environment" {
  description = "Entorno donde se despliega la tabla DynamoDB (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar la tabla DynamoDB"
  type        = string
  default     = "order-management"
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
aws_region   = "us-east-1"
environment  = "dev"
project_name = "order-management"

dynamodb_table_name       = "orders-dev"
dynamodb_billing_mode     = "PAY_PER_REQUEST"
dynamodb_hash_key         = "order_id"
dynamodb_range_key        = "created_at"
dynamodb_read_capacity    = 5
dynamodb_write_capacity   = 5
dynamodb_stream_enabled   = true
dynamodb_stream_view_type = "NEW_AND_OLD_IMAGES"
dynamodb_ttl_attribute    = "expiry_time"
dynamodb_ttl_enabled      = false

dynamodb_gsi = [
  {
    name            = "customer_index"
    hash_key        = "customer_id"
    range_key       = "order_date"
    read_capacity   = 5
    write_capacity  = 5
    projection_type = "ALL"
  },
  {
    name            = "status_index"
    hash_key        = "status"
    range_key       = "updated_at"
    read_capacity   = 5
    write_capacity  = 5
    projection_type = "KEYS_ONLY"
  }
]

tags = {
  Environment = "dev"
  Project     = "order-management"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
  Compliance  = "pci-dss"
  Backup      = "enabled"
  Monitoring  = "enabled"
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
resource "aws_dynamodb_table" "this" {
  name             = var.table_name
  billing_mode     = var.billing_mode
  hash_key         = var.hash_key
  range_key        = var.range_key != "" ? var.range_key : null
  stream_enabled   = var.stream_enabled
  stream_view_type = var.stream_enabled ? var.stream_view_type : null
  ttl {
    attribute_name = var.ttl_enabled ? var.ttl_attribute : null
    enabled        = var.ttl_enabled
  }

  dynamic "attribute" {
    for_each = concat([{ name = var.hash_key, type = "S" }], var.range_key != "" ? [{ name = var.range_key, type = "S" }] : [], [for gsi in var.gsi : { name = gsi.hash_key, type = "S" }])
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = [for gsi in var.gsi : gsi if var.billing_mode == "PROVISIONED"]
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = lookup(global_secondary_index.value, "range_key", null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = global_secondary_index.value.read_capacity
      write_capacity  = global_secondary_index.value.write_capacity
    }
  }

  dynamic "global_secondary_index" {
    for_each = [for gsi in var.gsi : gsi if var.billing_mode == "PAY_PER_REQUEST"]
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = lookup(global_secondary_index.value, "range_key", null)
      projection_type = global_secondary_index.value.projection_type
    }
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-dynamodb-${var.table_name}"
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terraform"
    }
  )

  lifecycle {
    prevent_destroy = false
    ignore_changes = [
      tags["LastUpdated"],
      billing_mode
    ]
  }
}

resource "aws_sns_topic" "dynamodb_stream" {
  count = var.stream_enabled ? 1 : 0
  name  = "${var.project_name}-${var.environment}-dynamodb-stream-${var.table_name}"
  tags = merge(var.tags, {
    Name        = "${var.project_name}-${var.environment}-dynamodb-stream"
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}

resource "aws_lambda_event_source_mapping" "dynamodb_stream_lambda" {
  count                              = var.stream_enabled ? 1 : 0
  event_source_arn                   = aws_dynamodb_table.this.stream_arn
  function_name                      = "${var.project_name}-${var.environment}-process-dynamodb-stream"
  starting_position                  = "LATEST"
  batch_size                         = 100
  maximum_batching_window_in_seconds = 30
  destination_config {
    on_failure {
      destination_arn = aws_sns_topic.dynamodb_stream[0].arn
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "throttled_read_requests" {
  count               = var.billing_mode == "PROVISIONED" ? 1 : 0
  alarm_name          = "${var.table_name}-throttled-read-requests"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ThrottledRequests"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "This alarm triggers when DynamoDB read requests are throttled"
  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
  tags = merge(var.tags, {
    Name        = "${var.table_name}-throttled-read-alarm"
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}

resource "aws_cloudwatch_metric_alarm" "throttled_write_requests" {
  count               = var.billing_mode == "PROVISIONED" ? 1 : 0
  alarm_name          = "${var.table_name}-throttled-write-requests"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ThrottledRequests"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "This alarm triggers when DynamoDB write requests are throttled"
  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
  tags = merge(var.tags, {
    Name        = "${var.table_name}-throttled-write-alarm"
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}

resource "aws_cloudwatch_metric_alarm" "consumed_read_capacity" {
  count               = var.billing_mode == "PROVISIONED" ? 1 : 0
  alarm_name          = "${var.table_name}-consumed-read-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.read_capacity * 0.8
  alarm_description   = "This alarm triggers when DynamoDB read capacity is 80% consumed"
  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
  tags = merge(var.tags, {
    Name        = "${var.table_name}-consumed-read-capacity"
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}

resource "aws_cloudwatch_metric_alarm" "consumed_write_capacity" {
  count               = var.billing_mode == "PROVISIONED" ? 1 : 0
  alarm_name          = "${var.table_name}-consumed-write-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.write_capacity * 0.8
  alarm_description   = "This alarm triggers when DynamoDB write capacity is 80% consumed"
  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
  tags = merge(var.tags, {
    Name        = "${var.table_name}-consumed-write-capacity"
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.name
}

output "table_arn" {
  description = "ARN completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.arn
}

output "table_id" {
  description = "Identificador único de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.id
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB (si está habilitado)"
  value       = var.stream_enabled ? aws_dynamodb_table.this.stream_arn : null
}

output "table_stream_label" {
  description = "Etiqueta del stream de DynamoDB (si está habilitado)"
  value       = var.stream_enabled ? aws_dynamodb_table.this.stream_label : null
}

output "hash_key_attribute_name" {
  description = "Nombre del atributo de clave de partición"
  value       = aws_dynamodb_table.this.hash_key
}

output "range_key_attribute_name" {
  description = "Nombre del atributo de clave de ordenación"
  value       = var.range_key != "" ? aws_dynamodb_table.this.range_key : null
}

output "billing_mode" {
  description = "Modo de facturación de la tabla"
  value       = aws_dynamodb_table.this.billing_mode
}

output "global_secondary_index_names" {
  description = "Nombres de los índices secundarios globales"
  value       = [for gsi in aws_dynamodb_table.this.global_secondary_index : gsi.name]
}

output "global_secondary_index_arns" {
  description = "ARNs de los índices secundarios globales"
  value       = { for gsi in aws_dynamodb_table.this.global_secondary_index : gsi.name => gsi.arn }
}

output "table_tags" {
  description = "Etiquetas aplicadas a la tabla"
  value       = aws_dynamodb_table.this.tags
}

output "throttled_read_alarm_name" {
  description = "Nombre del alarm de lecturas throttleadas"
  value       = var.billing_mode == "PROVISIONED" ? aws_cloudwatch_metric_alarm.throttled_read_requests[0].alarm_name : null
}

output "throttled_write_alarm_name" {
  description = "Nombre del alarm de escrituras throttleadas"
  value       = var.billing_mode == "PROVISIONED" ? aws_cloudwatch_metric_alarm.throttled_write_requests[0].alarm_name : null
}

output "sns_topic_arn" {
  description = "ARN del topic SNS para notificaciones de stream (si está habilitado)"
  value       = var.stream_enabled ? aws_sns_topic.dynamodb_stream[0].arn : null
}

output "lambda_event_source_mapping_id" {
  description = "ID del event source mapping para Lambda (si está habilitado)"
  value       = var.stream_enabled ? aws_lambda_event_source_mapping.dynamodb_stream_lambda[0].uuid : null
}

// === ARCHIVO: infra/README.md ===
# Infrastructure as Code - Order Management System

Este proyecto contiene la definición de infraestructura como código utilizando Terraform para desplegar los recursos de AWS necesarios para el sistema de gestión de órdenes.

## Estructura del Proyecto

```
infra/
├── README.md                    # Este archivo
├── versions.tf                  # Configuración de versiones de Terraform y providers
├── providers.tf                 # Configuración de providers de Terraform
├── variables.tf                 # Variables globales del proyecto
├── main.tf                      # Orchestración principal de recursos
├── outputs.tf                   # Outputs del proyecto
├── environments/
│   └── dev/
│       └── terraform.tfvars     # Variables específicas del entorno dev
└── modules/
    └── dynamodb/
        ├── main.tf              # Definición del módulo DynamoDB
        ├── variables.tf         # Variables del módulo
        └── outputs.tf           # Outputs del módulo
```

## Requisitos Previos

- Terraform >= 1.7.0
- AWS CLI configurado con credenciales válidas
- Acceso a la región de AWS configurada

## Configuración Inicial

### 1. Configurar credenciales de AWS

```bash
aws configure
o
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="us-east-1"
```

### 2. Inicializar Terraform

```bash
cd infra
terraform init
```

### 3. Validar la configuración

```bash
terraform validate
```

### 4. Planificar los cambios

```bash
terraform plan -var-file=environments/dev/terraform.tfvars
```

### 5. Aplicar la infraestructura

```bash
terraform apply -var-file=environments/dev/terraform.tfvars
```

## Uso de Módulos

### Módulo DynamoDB

El módulo `dynamodb` crea una tabla de DynamoDB con configuración personalizable. Se utiliza en `main.tf` instanciando el módulo con las variables apropiadas.

**Parámetros principales:**
- `table_name`: Nombre de la tabla (por defecto: "orders")
- `billing_mode`: Modo de facturación ("PAY_PER_REQUEST" o "PROVISIONED")
- `hash_key`: Clave de partición (PK)
- `range_key`: Clave de ordenamiento (opcional)
- `read_capacity` / `write_capacity`: Capacidad para modo aprovisionado
- `stream_enabled`: Habilitar DynamoDB Streams
- `stream_view_type`: Tipo de vista del stream
- `ttl_attribute`: Atributo TTL
- `ttl_enabled`: Habilitar TTL
- `gsi`: Lista de índices secundarios globales

**Ejemplo de uso directo:**

```hcl
module "orders_table" {
  source = "./modules/dynamodb"

  table_name    = "mi-tabla-ordenes"
  billing_mode  = "PAY_PER_REQUEST"
  hash_key      = "order_id"
  range_key     = "customer_id"
  environment   = "prod"
  project_name  = "order-management"

  tags = {
    Environment = "prod"
    Project     = "order-management"
  }
}
```

## Configuración por Ambiente

El proyecto soporta múltiples ambientes mediante archivos de variables:

- **Desarrollo**: `environments/dev/terraform.tfvars`
- **Producción**: Crear `environments/prod/terraform.tfvars`

### Ejemplo de terraform.tfvars

```hcl
aws_region    = "us-east-1"
environment   = "dev"
project_name  = "order-management"

dynamodb_table_name         = "orders"
dynamodb_billing_mode       = "PAY_PER_REQUEST"
dynamodb_hash_key           = "order_id"
dynamodb_stream_enabled     = true
dynamodb_stream_view_type   = "NEW_AND_OLD_IMAGES"
```

## Variables Disponibles

### Variables Globales (variables.tf)

| Variable | Tipo | Descripción | Valor por defecto |
|----------|------|-------------|-------------------|
| `aws_region` | string | Región de AWS | us-east-1 |
| `environment` | string | Ambiente de despliegue | dev |
| `project_name` | string | Nombre del proyecto | order-management |

### Variables de DynamoDB

| Variable | Tipo | Descripción | Valor por defecto |
|----------|------|-------------|-------------------|
| `dynamodb_table_name` | string | Nombre de la tabla | orders |
| `dynamodb_billing_mode` | string | Modo de facturación | PAY_PER_REQUEST |
| `dynamodb_hash_key` | string | Clave de partición | order_id |
| `dynamodb_range_key` | string | Clave de ordenamiento | (vacío) |
| `dynamodb_read_capacity` | number | Capacidad de lectura | 5 |
| `dynamodb_write_capacity` | number | Capacidad de escritura | 5 |
| `dynamodb_stream_enabled` | bool | Habilitar Streams | false |
| `dynamodb_stream_view_type` | string | Tipo de vista | (vacío) |
| `dynamodb_ttl_attribute` | string | Atributo TTL | expiry_time |
| `dynamodb_ttl_enabled` | bool | Habilitar TTL | false |

## Outputs

El proyecto expone los siguientes outputs:

- `dynamodb_table_name`: Nombre de la tabla creada
- `dynamodb_table_arn`: ARN de la tabla
- `dynamodb_table_id`: ID de la tabla
- `dynamodb_stream_arn`: ARN del stream (si está habilitado)

## Limpieza de Recursos

Para destruir todos los recursos creados:

```bash
terraform destroy -var-file=environments/dev/terraform.tfvars
```

**Advertencia**: Esta operación elimina todos los recursos de AWS creados por este proyecto. Asegúrate de tener respaldos de los datos necesarios.

## Convenciones de Código

Este proyecto sigue las siguientes convenciones:

- **Recursos**: Nombres en snake_case (ej: `aws_dynamodb_table`)
- **Variables**: Nombres descriptivos con descripción y tipo
- **Módulos**: Reutilizables y con outputs bien definidos
- **Tags**: Metadatos consistentes en todos los recursos

## Troubleshooting

### Error: Provider not found

Asegúrate de ejecutar `terraform init` antes de planificar o aplicar.

### Error: Permission denied

Verifica que las credenciales de AWS tengan los permisos necesarios para crear recursos.

### Error: Resource already exists

Si la tabla ya existe, Terraform intentará importarla o fallará. Usa `terraform import` para recursos existentes.

// === ARCHIVO: infra/versions.tf ===
# Validación de región válida para evitar errores en tiempo de ejecución
locals {
  valid_regions = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    "eu-west-1", "eu-west-2", "eu-west-3", "eu-central-1",
    "ap-northeast-1", "ap-northeast-2", "ap-southeast-1", "ap-southeast-2",
    "sa-east-1", "ca-central-1"
  ]

  is_valid_region = contains(local.valid_regions, var.aws_region)
}

# Validación de entorno válido
locals {
  valid_environments = ["dev", "staging", "prod", "development", "production"]

  is_valid_environment = contains(local.valid_environments, var.environment)
}

# Validación de modo de facturación válido
locals {
  valid_billing_modes = ["PAY_PER_REQUEST", "PROVISIONED"]

  is_valid_billing_mode = contains(local.valid_billing_modes, var.dynamodb_billing_mode)
}

# Validación de tipos de vista de stream válidos
locals {
  valid_stream_view_types = ["", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES", "KEYS_ONLY"]

  is_valid_stream_view_type = contains(local.valid_stream_view_types, var.dynamodb_stream_view_type)
}

# Validación de capacidad mínima para modo aprovisionado
locals {
  is_provisioned_mode = var.dynamodb_billing_mode == "PROVISIONED"

  valid_read_capacity  = var.dynamodb_read_capacity >= 1 && var.dynamodb_read_capacity <= 100000
  valid_write_capacity = var.dynamodb_write_capacity >= 1 && var.dynamodb_write_capacity <= 100000
}

# Validación de configuración de GSI
locals {
  gsi_count     = length(var.dynamodb_gsi)
  max_gsi_count = 20

  valid_gsi_count = local.gsi_count <= local.max_gsi_count
}

# Mensajes de validación para errores claros
locals {
  validation_errors = concat(
    local.is_valid_region ? [] : ["La región '${var.aws_region}' no es válida para AWS"],
    local.is_valid_environment ? [] : ["El entorno '${var.environment}' no es válido"],
    local.is_valid_billing_mode ? [] : ["El modo de facturación '${var.dynamodb_billing_mode}' no es válido"],
    local.is_valid_stream_view_type ? [] : ["El tipo de vista de stream '${var.dynamodb_stream_view_type}' no es válido"],
    local.is_provisioned_mode && !local.valid_read_capacity ? ["La capacidad de lectura debe estar entre 1 y 100000"] : [],
    local.is_provisioned_mode && !local.valid_write_capacity ? ["La capacidad de escritura debe estar entre 1 y 100000"] : [],
    local.valid_gsi_count ? [] : ["El número de GSI no puede exceder ${local.max_gsi_count}"]
  )
}

// === ARCHIVO: infra/main.tf ===
terraform {
  // Backend configuration for state management
  backend "s3" {
    bucket         = "${var.project_name}-terraform-state"
    key            = "infra/main.tfstate"
    region         = var.aws_region
    encrypt        = true
    dynamodb_table = "${var.project_name}-terraform-locks"
  }
}

// Módulo de DynamoDB para almacenar órdenes
module "dynamodb_orders" {
  source = "./modules/dynamodb"

  # Configuración básica de la tabla
  table_name   = var.dynamodb_table_name
  billing_mode = var.dynamodb_billing_mode
  hash_key     = var.dynamodb_hash_key
  range_key    = var.dynamodb_range_key

  # Capacidad para modo aprovisionado
  read_capacity  = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity

  # Configuración de streams para captura de cambios
  stream_enabled   = var.dynamodb_stream_enabled
  stream_view_type = var.dynamodb_stream_view_type

  # Configuración de TTL para limpieza automática
  ttl_attribute = var.dynamodb_ttl_attribute
  ttl_enabled   = var.dynamodb_ttl_enabled

  # Índices secundarios globales
  gsi = var.dynamodb_gsi

  # Tags comunes
  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-orders-${var.environment}"
      Environment = var.environment
      Project     = var.project_name
      Component   = "DynamoDB"
    }
  )

  # Metadatos
  environment  = var.environment
  project_name = var.project_name
}

// SNS Topic para notificaciones de eventos de DynamoDB Stream
resource "aws_sns_topic" "order_events" {
  name                        = "${var.project_name}-order-events-${var.environment}"
  display_name                = "Order Events - ${var.environment}"
  fifo_topic                  = false
  content_based_deduplication = false

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-order-events"
      Environment = var.environment
      Project     = var.project_name
      Component   = "SNS"
    }
  )
}

// Policy para permitir a Lambda escribir en SNS
resource "aws_sns_topic_policy" "order_events_policy" {
  arn = aws_sns_topic.order_events.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "dynamodb.amazonaws.com"
        }
        Action = [
          "sns:Publish"
        ]
        Resource = aws_sns_topic.order_events.arn
        Condition = {
          ArnEquals = {
            "aws:SourceArn" = module.dynamodb_orders.table_arn
          }
        }
      }
    ]
  })
}

// CloudWatch Log Group para logs de la aplicación
resource "aws_cloudwatch_log_group" "application_logs" {
  name              = "/aws/${var.project_name}/${var.environment}/application"
  retention_in_days = var.environment == "prod" ? 30 : 7

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-application-logs"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// Alarma CloudWatch para errores de throttling en lectura
resource "aws_cloudwatch_metric_alarm" "dynamodb_read_throttle" {
  alarm_name          = "${var.project_name}-dynamodb-read-throttle-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ThrottledReadRequestCount"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "This alarm triggers when DynamoDB read requests are being throttled"
  alarm_actions       = []
  ok_actions          = []

  dimensions = {
    TableName = module.dynamodb_orders.table_name
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-dynamodb-read-throttle"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// Alarma CloudWatch para errores de throttling en escritura
resource "aws_cloudwatch_metric_alarm" "dynamodb_write_throttle" {
  alarm_name          = "${var.project_name}-dynamodb-write-throttle-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ThrottledWriteRequestCount"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "This alarm triggers when DynamoDB write requests are being throttled"
  alarm_actions       = []
  ok_actions          = []

  dimensions = {
    TableName = module.dynamodb_orders.table_name
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-dynamodb-write-throttle"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// Alarma para consumo excesivo de capacidad de lectura
resource "aws_cloudwatch_metric_alarm" "dynamodb_read_capacity" {
  alarm_name          = "${var.project_name}-dynamodb-read-capacity-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.dynamodb_billing_mode == "PROVISIONED" ? var.dynamodb_read_capacity * 0.8 : 100
  alarm_description   = "This alarm triggers when DynamoDB read capacity consumption exceeds 80%"
  alarm_actions       = []
  ok_actions          = []

  dimensions = {
    TableName = module.dynamodb_orders.table_name
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-dynamodb-read-capacity"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// Alarma para consumo excesivo de capacidad de escritura
resource "aws_cloudwatch_metric_alarm" "dynamodb_write_capacity" {
  alarm_name          = "${var.project_name}-dynamodb-write-capacity-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.dynamodb_billing_mode == "PROVISIONED" ? var.dynamodb_write_capacity * 0.8 : 100
  alarm_description   = "This alarm triggers when DynamoDB write capacity consumption exceeds 80%"
  alarm_actions       = []
  ok_actions          = []

  dimensions = {
    TableName = module.dynamodb_orders.table_name
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-dynamodb-write-capacity"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// Alarma para latencia elevada en lectura
resource "aws_cloudwatch_metric_alarm" "dynamodb_read_latency" {
  alarm_name          = "${var.project_name}-dynamodb-read-latency-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "3"
  metric_name         = "SuccessfulRequestLatency"
  namespace           = "AWS/DynamoDB"
  period              = "60"
  statistic           = "Average"
  threshold           = var.environment == "prod" ? 100 : 500
  alarm_description   = "This alarm triggers when DynamoDB read latency is too high"
  alarm_actions       = []
  ok_actions          = []

  dimensions = {
    TableName = module.dynamodb_orders.table_name
    Operation = "GetItem"
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-dynamodb-read-latency"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// Alarma para latencia elevada en escritura
resource "aws_cloudwatch_metric_alarm" "dynamodb_write_latency" {
  alarm_name          = "${var.project_name}-dynamodb-write-latency-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "3"
  metric_name         = "SuccessfulRequestLatency"
  namespace           = "AWS/DynamoDB"
  period              = "60"
  statistic           = "Average"
  threshold           = var.environment == "prod" ? 100 : 500
  alarm_description   = "This alarm triggers when DynamoDB write latency is too high"
  alarm_actions       = []
  ok_actions          = []

  dimensions = {
    TableName = module.dynamodb_orders.table_name
    Operation = "PutItem"
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-dynamodb-write-latency"
      Environment = var.environment
      Project     = var.project_name
      Component   = "CloudWatch"
    }
  )
}

// === ARCHIVO: infra/outputs.tf ===
# Outputs de la tabla DynamoDB
output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_id
}

output "dynamodb_hash_key_attribute_name" {
  description = "Nombre del atributo de clave de partición"
  value       = module.dynamodb_orders.hash_key_attribute_name
}

output "dynamodb_range_key_attribute_name" {
  description = "Nombre del atributo de clave de ordenación"
  value       = module.dynamodb_orders.range_key_attribute_name
}

output "dynamodb_billing_mode" {
  description = "Modo de facturación de la tabla DynamoDB"
  value       = module.dynamodb_orders.billing_mode
}

output "dynamodb_global_secondary_index_names" {
  description = "Nombres de los índices secundarios globales"
  value       = module.dynamodb_orders.global_secondary_index_names
}

output "dynamodb_global_secondary_index_arns" {
  description = "ARNs de los índices secundarios globales"
  value       = module.dynamodb_orders.global_secondary_index_arns
}

output "dynamodb_stream_arn" {
  description = "ARN del stream de DynamoDB si está habilitado"
  value       = module.dynamodb_orders.table_stream_arn
  sensitive   = false
}

output "dynamodb_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = module.dynamodb_orders.table_stream_label
}

output "dynamodb_table_tags" {
  description = "Tags aplicados a la tabla DynamoDB"
  value       = module.dynamodb_orders.table_tags
}

output "dynamodb_throttled_read_alarm_name" {
  description = "Nombre de la alarma de throttling de lectura"
  value       = module.dynamodb_orders.throttled_read_alarm_name
}

output "dynamodb_throttled_write_alarm_name" {
  description = "Nombre de la alarma de throttling de escritura"
  value       = module.dynamodb_orders.throttled_write_alarm_name
}

output "dynamodb_sns_topic_arn" {
  description = "ARN del topic SNS de DynamoDB stream"
  value       = module.dynamodb_orders.sns_topic_arn
}

output "dynamodb_lambda_event_source_mapping_id" {
  description = "ID del event source mapping de Lambda"
  value       = module.dynamodb_orders.lambda_event_source_mapping_id
}

# Outputs del topic SNS
output "sns_order_events_topic_arn" {
  description = "ARN del topic SNS para eventos de órdenes"
  value       = aws_sns_topic.order_events.arn
}

output "sns_order_events_topic_name" {
  description = "Nombre del topic SNS para eventos de órdenes"
  value       = aws_sns_topic.order_events.name
}

# Outputs de CloudWatch
output "cloudwatch_log_group_name" {
  description = "Nombre del grupo de logs de CloudWatch"
  value       = aws_cloudwatch_log_group.application_logs.name
}

output "cloudwatch_log_group_arn" {
  description = "ARN del grupo de logs de CloudWatch"
  value       = aws_cloudwatch_log_group.application_logs.arn
}

output "dynamodb_read_throttle_alarm_name" {
  description = "Nombre de la alarma de throttling de lectura"
  value       = aws_cloudwatch_metric_alarm.dynamodb_read_throttle.alarm_name
}

output "dynamodb_write_throttle_alarm_name" {
  description = "Nombre de la alarma de throttling de escritura"
  value       = aws_cloudwatch_metric_alarm.dynamodb_write_throttle.alarm_name
}

output "dynamodb_read_capacity_alarm_name" {
  description = "Nombre de la alarma de capacidad de lectura"
  value       = aws_cloudwatch_metric_alarm.dynamodb_read_capacity.alarm_name
}

output "dynamodb_write_capacity_alarm_name" {
  description = "Nombre de la alarma de capacidad de escritura"
  value       = aws_cloudwatch_metric_alarm.dynamodb_write_capacity.alarm_name
}

output "dynamodb_read_latency_alarm_name" {
  description = "Nombre de la alarma de latencia de lectura"
  value       = aws_cloudwatch_metric_alarm.dynamodb_read_latency.alarm_name
}

output "dynamodb_write_latency_alarm_name" {
  description = "Nombre de la alarma de latencia de escritura"
  value       = aws_cloudwatch_metric_alarm.dynamodb_write_latency.alarm_name
}

# Outputs de información general
output "environment" {
  description = "Entorno de despliegue"
  value       = var.environment
}

output "aws_region" {
  description = "Región de AWS"
  value       = var.aws_region
}

output "project_name" {
  description = "Nombre del proyecto"
  value       = var.project_name
}

output "dynamodb_stream_enabled" {
  description = "Indica si el stream de DynamoDB está habilitado"
  value       = var.dynamodb_stream_enabled
}

output "dynamodb_ttl_enabled" {
  description = "Indica si el TTL está habilitado"
  value       = var.dynamodb_ttl_enabled
}

output "dynamodb_ttl_attribute" {
  description = "Nombre del atributo de TTL"
  value       = var.dynamodb_ttl_attribute
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
