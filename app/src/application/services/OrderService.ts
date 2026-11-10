import { IOrderRepository } from '../../domain/repositories/OrderRepository';
import { Order, OrderDTO, OrderStatus } from '../../domain/models/Order';

export class OrderService {
  private readonly repository: IOrderRepository;

  constructor(repository: IOrderRepository) {
    this.repository = repository;
  }

  async createOrder(dto: OrderDTO): Promise<Order> {
    if (!dto.customerId || dto.customerId.trim().length === 0) {
      throw new Error('Customer ID is required');
    }

    if (!dto.items || dto.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    for (const item of dto.items) {
      if (!item.productId || item.productId.trim().length === 0) {
        throw new Error('Each order item must have a product ID');
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error('Item quantity must be greater than zero');
      }
      if (!item.price || item.price < 0) {
        throw new Error('Item price must be non-negative');
      }
    }

    const totalAmount = this.calculateTotal(dto.items);
    const orderDTO: OrderDTO = {
      ...dto,
      status: dto.status || 'PENDING' as OrderStatus,
      totalAmount,
    };

    return this.repository.create(orderDTO);
  }

  async getOrder(id: string): Promise<Order | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    return this.repository.findById(id);
  }

  async updateOrder(id: string, dto: OrderDTO): Promise<Order> {
    if (!id || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    const existingOrder = await this.repository.findById(id);
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (dto.status) {
      const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
      if (!validStatuses.includes(dto.status)) {
        throw new Error(`Invalid order status: ${dto.status}`);
      }

      if (existingOrder.status === 'CANCELLED' && dto.status !== 'CANCELLED') {
        throw new Error('Cannot change status of a cancelled order');
      }

      if (existingOrder.status === 'DELIVERED') {
        throw new Error('Cannot modify a delivered order');
      }
    }

    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        if (!item.productId || item.productId.trim().length === 0) {
          throw new Error('Each order item must have a product ID');
        }
        if (!item.quantity || item.quantity <= 0) {
          throw new Error('Item quantity must be greater than zero');
        }
        if (!item.price || item.price < 0) {
          throw new Error('Item price must be non-negative');
        }
      }

      const totalAmount = this.calculateTotal(dto.items);
      dto.totalAmount = totalAmount;
    }

    const updatedDTO: OrderDTO = {
      ...existingOrder,
      ...dto,
      id: existingOrder.id,
    };

    return this.repository.update(id, updatedDTO);
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    const existingOrder = await this.repository.findById(id);
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (existingOrder.status === 'DELIVERED') {
      throw new Error('Cannot delete a delivered order');
    }

    return this.repository.delete(id);
  }

  async listOrders(): Promise<Order[]> {
    return this.repository.list();
  }

  private calculateTotal(items: Array<{ price: number; quantity: number }>): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}