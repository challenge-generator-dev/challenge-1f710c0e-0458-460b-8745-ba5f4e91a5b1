import request from 'supertest';
import { Express } from 'express';
import { OrderDTO, OrderStatus } from '../../src/domain/models/Order';

let app: Express;

beforeAll(async () => {
  app = request(require('../../src/app').default);
});

describe('OrderController - Integración', () => {
  const validOrderDTO: OrderDTO = {
    customerId: 'customer-123',
    items: [
      {
        productId: 'product-1',
        quantity: 2,
        price: 10.50,
        name: 'Producto de prueba'
      }
    ],
    status: 'PENDING' as OrderStatus
  };

  describe('POST /api/orders', () => {
    it('debería crear una orden exitosamente', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send(validOrderDTO)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.customerId).toBe(validOrderDTO.customerId);
      expect(response.body.items).toHaveLength(validOrderDTO.items.length);
    });

    it('debería validar datos requeridos', async () => {
      const invalidOrder = { customerId: 'customer-123' };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('debería obtener una orden por ID', async () => {
      const createResponse = await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const orderId = createResponse.body.id;

      const getResponse = await request(app)
        .get(`/api/orders/${orderId}`)
        .expect('Content-Type', /json/);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.id).toBe(orderId);
    });

    it('debería retornar 404 para orden inexistente', async () => {
      const response = await request(app)
        .get('/api/orders/inexistente-id-123')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/orders/:id', () => {
    it('debería actualizar una orden existente', async () => {
      const createResponse = await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const orderId = createResponse.body.id;
      const updatedData = {
        ...validOrderDTO,
        status: 'SHIPPED' as OrderStatus
      };

      const updateResponse = await request(app)
        .put(`/api/orders/${orderId}`)
        .send(updatedData)
        .expect('Content-Type', /json/);

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.status).toBe('SHIPPED');
    });

    it('debería retornar 404 al actualizar orden inexistente', async () => {
      const response = await request(app)
        .put('/api/orders/inexistente-id-456')
        .send(validOrderDTO)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('debería eliminar una orden exitosamente', async () => {
      const createResponse = await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const orderId = createResponse.body.id;

      await request(app)
        .delete(`/api/orders/${orderId}`)
        .expect(204);

      await request(app)
        .get(`/api/orders/${orderId}`)
        .expect(404);
    });

    it('debería retornar 404 al eliminar orden inexistente', async () => {
      const response = await request(app)
        .delete('/api/orders/inexistente-id-789')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/orders', () => {
    it('debería listar todas las ordenes', async () => {
      await request(app)
        .post('/api/orders')
        .send(validOrderDTO);

      const response = await request(app)
        .get('/api/orders')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});