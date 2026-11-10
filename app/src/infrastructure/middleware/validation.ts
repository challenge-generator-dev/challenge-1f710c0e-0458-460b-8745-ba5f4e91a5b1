import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, Result } from 'express-validator';
import {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  deleteOrderSchema,
  listOrdersQuerySchema
} from '@utils/validationSchemas';

interface ValidationRequest extends Request {
  validationErrors?: Result;
}

export const validateCreateOrder: ValidationChain[] = createOrderSchema;

export const validateUpdateOrder: ValidationChain[] = updateOrderSchema;

export const validateGetOrder: ValidationChain[] = getOrderSchema;

export const validateDeleteOrder: ValidationChain[] = deleteOrderSchema;

export const validateListOrders: ValidationChain[] = listOrdersQuerySchema;

export const handleValidation = (
  req: ValidationRequest,
  res: Response,
  next: NextFunction
): void => {
  const errors: Result = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: 'path' in err ? err.path : 'unknown',
      message: err.msg,
      value: 'value' in err ? err.value : undefined,
    }));
    
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: formattedErrors,
    });
    return;
  }
  
  next();
};

export const createValidationMiddleware = (validations: ValidationChain[]) => {
  return [
    ...validations,
    handleValidation,
  ];
};

// Middleware específico para validar el cuerpo de la orden
// Calcula el totalAmount automáticamente si no se proporciona
export const enrichOrderData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { items, totalAmount } = req.body;
  
  if (items && Array.isArray(items) && !totalAmount) {
    const calculatedTotal = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return sum + itemTotal;
    }, 0);
    
    req.body.totalAmount = Math.round(calculatedTotal * 100) / 100;
  }
  
  next();
};

// Middleware para sanitizar inputs
export const sanitizeInputs = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const sanitizeString = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return value.replace(/[<>]/g, '').trim();
    }
    if (Array.isArray(value)) {
      return value.map(sanitizeString);
    }
    if (value && typeof value === 'object') {
      const sanitized: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(value)) {
        sanitized[key] = sanitizeString(val);
      }
      return sanitized;
    }
    return value;
  };
  
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeString(req.body) as Record<string, unknown>;
  }
  
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeString(req.query) as Record<string, unknown>;
  }
  
  next();
};