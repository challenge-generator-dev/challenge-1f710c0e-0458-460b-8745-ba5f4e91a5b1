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