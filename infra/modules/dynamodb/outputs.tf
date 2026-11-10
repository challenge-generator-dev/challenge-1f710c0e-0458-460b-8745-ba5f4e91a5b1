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