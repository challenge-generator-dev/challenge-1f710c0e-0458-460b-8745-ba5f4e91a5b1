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