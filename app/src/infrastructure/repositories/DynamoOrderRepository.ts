import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
    ScanCommand
} from '@aws-sdk/lib-dynamodb';
import { Order, OrderDTO, OrderStatus, calculateTotalAmount } from '@domain/models/Order';
import { IOrderRepository } from '@domain/repositories/OrderRepository';
import { InternalServerError } from '@utils/errors';

export class DynamoOrderRepository implements IOrderRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        const dynamoDBClient = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
            credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
                ? {
                      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                  }
                : undefined
        });
        this.client = DynamoDBDocumentClient.from(dynamoDBClient);
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Orders';
    }

    async create(orderDTO: OrderDTO): Promise<Order> {
        if (!orderDTO.customerId || !orderDTO.items || orderDTO.items.length === 0) {
            throw new Error('Customer ID and items are required');
        }

        const now = new Date().toISOString();
        const order: Order = {
            id: orderDTO.id || this.generateId(),
            customerId: orderDTO.customerId,
            items: orderDTO.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name
            })),
            status: orderDTO.status || 'PENDING',
            totalAmount: orderDTO.totalAmount || calculateTotalAmount(orderDTO.items),
            createdAt: now,
            updatedAt: now
        };

        const params = {
            TableName: this.tableName,
            Item: order
        };

        try {
            await this.client.send(new PutCommand(params));
            return order;
        } catch (error) {
            throw new InternalServerError(`Failed to create order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findById(id: string): Promise<Order | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        try {
            const result = await this.client.send(new GetCommand(params));
            return result.Item ? this.mapDynamoItemToOrder(result.Item) : null;
        } catch (error) {
            throw new InternalServerError(`Failed to find order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async update(id: string, orderDTO: OrderDTO): Promise<Order> {
        if (!orderDTO.items || orderDTO.items.length === 0) {
            throw new Error('Items are required');
        }

        const now = new Date().toISOString();
        const updateExpressionParts: string[] = [
            '#status = :status',
            '#totalAmount = :totalAmount',
            '#updatedAt = :updatedAt'
        ];
        const expressionAttributeNames: Record<string, string> = {
            '#status': 'status',
            '#totalAmount': 'totalAmount',
            '#updatedAt': 'updatedAt'
        };
        const expressionAttributeValues: Record<string, any> = {
            ':status': orderDTO.status || 'PENDING',
            ':totalAmount': calculateTotalAmount(orderDTO.items),
            ':updatedAt': now
        };

        if (orderDTO.items) {
            updateExpressionParts.push('#items = :items');
            expressionAttributeNames['#items'] = 'items';
            expressionAttributeValues[':items'] = orderDTO.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name
            }));
        }

        const params = {
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW' as const
        };

        try {
            const result = await this.client.send(new UpdateCommand(params));
            if (!result.Attributes) {
                throw new Error('Order not found');
            }
            return this.mapDynamoItemToOrder(result.Attributes);
        } catch (error) {
            throw new InternalServerError(`Failed to update order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async delete(id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        try {
            await this.client.send(new DeleteCommand(params));
        } catch (error) {
            throw new InternalServerError(`Failed to delete order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async list(): Promise<Order[]> {
        const params = {
            TableName: this.tableName
        };

        try {
            const result = await this.client.send(new ScanCommand(params));
            return result.Items ? result.Items.map(item => this.mapDynamoItemToOrder(item)) : [];
        } catch (error) {
            throw new InternalServerError(`Failed to list orders: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private mapDynamoItemToOrder(item: Record<string, any>): Order {
        return {
            id: item.id,
            customerId: item.customerId,
            items: item.items.map((i: Record<string, any>) => ({
                productId: i.productId,
                quantity: i.quantity,
                price: i.price,
                name: i.name
            })),
            status: item.status as OrderStatus,
            totalAmount: item.totalAmount,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    }
}