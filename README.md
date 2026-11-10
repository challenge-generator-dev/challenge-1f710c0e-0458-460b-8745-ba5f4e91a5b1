# Implementación de CRUD de ordenes en DynamoDB

El sistema debe permitir a los usuarios realizar operaciones CRUD sobre las órdenes almacenadas en una tabla de DynamoDB. Las operaciones deben estar expuestas a través de una API REST. El sistema debe manejar correctamente los casos de error y validaciones específicas del dominio de las órdenes.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno y creación de la tabla DynamoDB

**Objetivo:** Configurar el entorno de desarrollo y crear la tabla DynamoDB para almacenar las órdenes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el entorno de desarrollo utilizando Terraform para desplegar la infraestructura necesaria.
- Crea una tabla DynamoDB con las columnas necesarias para almacenar las órdenes (id, cliente, producto, cantidad, fecha).

**Entregable:** Entorno de desarrollo configurado y tabla DynamoDB creada.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza Terraform para gestionar la infraestructura.
- Define las columnas de la tabla DynamoDB según las necesidades del dominio de las órdenes.

</details>

### Fase 2: Implementación de las operaciones CRUD

**Objetivo:** Implementar las operaciones CRUD (Create, Read, Update, Delete) sobre la tabla DynamoDB.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementa las operaciones CRUD en la API REST para permitir la creación, lectura, actualización y eliminación de órdenes.
- Asegúrate de manejar correctamente los errores y validaciones específicas del dominio de las órdenes.

**Entregable:** Operaciones CRUD implementadas y funcionales en la API REST.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza el marco de trabajo del lenguaje principal para implementar las operaciones CRUD.
- Maneja los errores y validaciones según las reglas del dominio de las órdenes.

</details>

### Fase 3: Pruebas y optimización

**Objetivo:** Realizar pruebas exhaustivas de las operaciones CRUD y optimizar el rendimiento de la API REST.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Realiza pruebas unitarias y de integración para asegurar la correcta funcionalidad de las operaciones CRUD.
- Optimiza el rendimiento de la API REST identificando y resolviendo cuellos de botella.

**Entregable:** Pruebas unitarias y de integración completas, API REST optimizada.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de pruebas del lenguaje principal para realizar las pruebas unitarias y de integración.
- Identifica y resuelve los cuellos de botella para optimizar el rendimiento de la API REST.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y por qué es importante en el dominio de las órdenes?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de las órdenes?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en la API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización del rendimiento de la API REST?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo y creación de la tabla DynamoDB.
- Implementación correcta de las operaciones CRUD en la API REST.
- Manejo adecuado de errores y validaciones específicas del dominio de las órdenes.
- Realización de pruebas unitarias y de integración completas.
- Optimización del rendimiento de la API REST.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
