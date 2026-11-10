export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderDTO {
    id?: string;
    customerId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
        name: string;
    }[];
    status?: OrderStatus;
    totalAmount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export const OrderStatusValues: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export function calculateTotalAmount(items: OrderItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function validateOrderStatus(status: string): status is OrderStatus {
    return OrderStatusValues.includes(status as OrderStatus);
}