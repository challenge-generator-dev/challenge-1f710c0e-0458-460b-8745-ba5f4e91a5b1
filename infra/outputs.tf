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