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