import express, { Application, Request, Response, NextFunction } from 'express';
import { OrderController } from './infrastructure/controllers/OrderController';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import { IOrderRepository } from './domain/repositories/OrderRepository';

export function createApp(repository: IOrderRepository): Application {
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  const orderController = new OrderController(repository);
  const orderRouter = orderController.getRouter();
  app.use('/api/orders', orderRouter);
  
  app.use(errorHandler);
  
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
  
  return app;
}