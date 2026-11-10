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