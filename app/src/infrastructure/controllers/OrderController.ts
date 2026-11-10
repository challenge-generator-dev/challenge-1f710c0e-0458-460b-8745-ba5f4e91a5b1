import express, { Request, Response, NextFunction } from 'express';
import { IOrderRepository } from '../../domain/repositories/OrderRepository';
import { OrderDTO } from '../../domain/models/Order';

export class OrderController {
    private readonly repository: IOrderRepository;

    constructor(repository: IOrderRepository) {
        this.repository = repository;
    }

    async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderDTO: OrderDTO = req.body;
            
            if (!orderDTO.customerId || !orderDTO.items || orderDTO.items.length === 0) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'customerId and items are required'
                });
                return;
            }

            const createdOrder = await this.repository.create(orderDTO);
            res.status(201).json(createdOrder);
        } catch (error) {
            next(error);
        }
    }

    async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'Order ID is required'
                });
                return;
            }

            const order = await this.repository.findById(id);
            
            if (!order) {
                res.status(404).json({
                    error: 'Not found',
                    message: `Order with ID ${id} not found`
                });
                return;
            }

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const orderDTO: OrderDTO = req.body;

            if (!id) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'Order ID is required'
                });
                return;
            }

            const existingOrder = await this.repository.findById(id);
            if (!existingOrder) {
                res.status(404).json({
                    error: 'Not found',
                    message: `Order with ID ${id} not found`
                });
                return;
            }

            const updatedOrder = await this.repository.update(id, orderDTO);
            res.status(200).json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    error: 'Invalid request',
                    message: 'Order ID is required'
                });
                return;
            }

            const existingOrder = await this.repository.findById(id);
            if (!existingOrder) {
                res.status(404).json({
                    error: 'Not found',
                    message: `Order with ID ${id} not found`
                });
                return;
            }

            await this.repository.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async listOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = await this.repository.list();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    getRouter(): express.Router {
        const router = express.Router();
        
        router.post('/', this.createOrder.bind(this));
        router.get('/:id', this.getOrder.bind(this));
        router.put('/:id', this.updateOrder.bind(this));
        router.delete('/:id', this.deleteOrder.bind(this));
        router.get('/', this.listOrders.bind(this));
        
        return router;
    }
}