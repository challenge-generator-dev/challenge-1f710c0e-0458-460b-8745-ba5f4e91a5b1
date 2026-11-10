import { OrderService } from '../../src/application/services/OrderService';
import { IOrderRepository } from '../../src/domain/repositories/OrderRepository';
import { OrderDTO, OrderStatus } from '../../src/domain/models/Order';

describe('OrderService', () => {
  let orderService: OrderService;
  let mockRepository: jest.Mocked<IOrderRepository>;
  
  const mockOrderDTO: OrderDTO = {
    customerId: 'CUST-001',
    items: [
      { productId: 'PROD-001', quantity: 2, price: 50.00, name: 'Producto A' }
    ],
    status: 'PENDING'
  };
  
  const mockOrder = {
    id: 'ORDER-123',
    customerId: 'CUST-001',
    items: [
      { productId: 'PROD-001', quantity: 2, price: 50.00, name: 'Producto A' }
    ],
    status: 'PENDING' as OrderStatus,
    totalAmount: 100.00,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn()
    };
    orderService = new OrderService(mockRepository);
  });

  describe('createOrder', () => {
    it('debe crear una orden exitosamente', async () => {
      mockRepository.create.mockResolvedValue(mockOrder);
      
      const result = await orderService.createOrder(mockOrderDTO);
      
      expect(mockRepository.create).toHaveBeenCalledWith(mockOrderDTO);
    });

    it('debe calcular el totalAmount automáticamente', async () => {
      mockRepository.create.mockResolvedValue(mockOrder);
      
      await orderService.createOrder(mockOrderDTO);
      
      const calledDTO = mockRepository.create.mock.calls[0][0];
      expect(calledDTO.totalAmount).toBe(100.00);
    });

    it('debe asignar estado PENDING por defecto', async () => {
      mockRepository.create.mockResolvedValue(mockOrder);
      
      await orderService.createOrder({ ...mockOrderDTO, status: undefined });
      
      const calledDTO = mockRepository.create.mock.calls[0][0];
      expect(calledDTO.status).toBe('PENDING');
    });

    it('debe lanzar error si customerId está vacío', async () => {
      const invalidDTO = { ...mockOrderDTO, customerId: '' };
      
      await expect(orderService.createOrder(invalidDTO)).rejects.toThrow();
    });

    it('debe lanzar error si items está vacío', async () => {
      const invalidDTO = { ...mockOrderDTO, items: [] };
      
      await expect(orderService.createOrder(invalidDTO)).rejects.toThrow();
    });
  });

  describe('getOrder', () => {
    it('debe obtener una orden por id', async () => {
      mockRepository.findById.mockResolvedValue(mockOrder);
      
      const result = await orderService.getOrder('ORDER-123');
      
      expect(mockRepository.findById).toHaveBeenCalledWith('ORDER-123');
    });

    it('debe retornar null si la orden no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);
      
      const result = await orderService.getOrder('NON-EXISTENT');
      
      expect(result).toBeNull();
    });
  });

  describe('updateOrder', () => {
    it('debe actualizar una orden existente', async () => {
      const updatedOrder = { ...mockOrder, status: 'SHIPPED' as OrderStatus };
      mockRepository.update.mockResolvedValue(updatedOrder);
      
      const result = await orderService.updateOrder('ORDER-123', mockOrderDTO);
      
      expect(mockRepository.update).toHaveBeenCalledWith('ORDER-123', mockOrderDTO);
    });

    it('debe recalcular totalAmount si los items cambian', async () => {
      const newDTO = {
        ...mockOrderDTO,
        items: [
          { productId: 'PROD-002', quantity: 1, price: 200.00, name: 'Producto B' }
        ]
      };
      mockRepository.update.mockResolvedValue({ ...mockOrder, totalAmount: 200.00 });
      
      await orderService.updateOrder('ORDER-123', newDTO);
      
      const calledDTO = mockRepository.update.mock.calls[0][1];
      expect(calledDTO.totalAmount).toBe(200.00);
    });
  });

  describe('deleteOrder', () => {
    it('debe eliminar una orden por id', async () => {
      mockRepository.delete.mockResolvedValue();
      
      await orderService.deleteOrder('ORDER-123');
      
      expect(mockRepository.delete).toHaveBeenCalledWith('ORDER-123');
    });
  });

  describe('listOrders', () => {
    it('debe listar todas las órdenes', async () => {
      const orders = [mockOrder, { ...mockOrder, id: 'ORDER-456' }];
      mockRepository.list.mockResolvedValue(orders);
      
      const result = await orderService.listOrders();
      
      expect(mockRepository.list).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    });

    it('debe retornar array vacío si no hay órdenes', async () => {
      mockRepository.list.mockResolvedValue([]);
      
      const result = await orderService.listOrders();
      
      expect(result).toEqual([]);
    });
  });

  describe('transiciones de estado válidas', () => {
    it('debe permitir transición de PENDING a PROCESSING', async () => {
      const orderInProcess = { ...mockOrder, status: 'PROCESSING' as OrderStatus };
      mockRepository.update.mockResolvedValue(orderInProcess);
      
      const result = await orderService.updateOrder('ORDER-123', {
        ...mockOrderDTO,
        status: 'PROCESSING'
      });
      
      expect(result.status).toBe('PROCESSING');
    });

    it('debe permitir transición de PROCESSING a SHIPPED', async () => {
      const shippedOrder = { ...mockOrder, status: 'SHIPPED' as OrderStatus };
      mockRepository.update.mockResolvedValue(shippedOrder);
      
      const result = await orderService.updateOrder('ORDER-123', {
        ...mockOrderDTO,
        status: 'SHIPPED'
      });
      
      expect(result.status).toBe('SHIPPED');
    });

    it('debe rechazar transición de PENDING directamente a DELIVERED', async () => {
      mockRepository.update.mockRejectedValue(new Error('Transición de estado inválida'));
      
      await expect(orderService.updateOrder('ORDER-123', {
        ...mockOrderDTO,
        status: 'DELIVERED'
      })).rejects.toThrow('Transición de estado inválida');
    });

    it('debe rechazar transición desde CANCELLED', async () => {
      mockRepository.findById.mockResolvedValue({ ...mockOrder, status: 'CANCELLED' as OrderStatus });
      mockRepository.update.mockRejectedValue(new Error('No se puede modificar una orden cancelada'));
      
      await expect(orderService.updateOrder('ORDER-123', mockOrderDTO)).rejects.toThrow();
    });
  });
});