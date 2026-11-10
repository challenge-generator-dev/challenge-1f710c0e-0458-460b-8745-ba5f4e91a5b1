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