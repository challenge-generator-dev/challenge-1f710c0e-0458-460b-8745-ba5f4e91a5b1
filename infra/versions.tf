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