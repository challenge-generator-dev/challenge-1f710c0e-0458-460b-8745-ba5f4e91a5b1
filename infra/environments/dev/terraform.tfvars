aws_region   = "us-east-1"
environment  = "dev"
project_name = "order-management"

dynamodb_table_name       = "orders-dev"
dynamodb_billing_mode     = "PAY_PER_REQUEST"
dynamodb_hash_key         = "order_id"
dynamodb_range_key        = "created_at"
dynamodb_read_capacity    = 5
dynamodb_write_capacity   = 5
dynamodb_stream_enabled   = true
dynamodb_stream_view_type = "NEW_AND_OLD_IMAGES"
dynamodb_ttl_attribute    = "expiry_time"
dynamodb_ttl_enabled      = false

dynamodb_gsi = [
  {
    name            = "customer_index"
    hash_key        = "customer_id"
    range_key       = "order_date"
    read_capacity   = 5
    write_capacity  = 5
    projection_type = "ALL"
  },
  {
    name            = "status_index"
    hash_key        = "status"
    range_key       = "updated_at"
    read_capacity   = 5
    write_capacity  = 5
    projection_type = "KEYS_ONLY"
  }
]

tags = {
  Environment = "dev"
  Project     = "order-management"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
  Compliance  = "pci-dss"
  Backup      = "enabled"
  Monitoring  = "enabled"
}