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