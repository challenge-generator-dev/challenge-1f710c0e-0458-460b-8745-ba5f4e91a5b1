import { Order, OrderDTO } from '../models/Order';

export interface IOrderRepository {
    create(order: OrderDTO): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: OrderDTO): Promise<Order>;
    delete(id: string): Promise<void>;
    list(): Promise<Order[]>;
}