import { body, param, query, ValidationChain } from 'express-validator';

const OrderStatusValues = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export const createOrderSchema: ValidationChain[] = [
  body('customerId')
    .trim()
    .notEmpty()
    .withMessage('El ID del cliente es obligatorio')
    .isString()
    .withMessage('El ID del cliente debe ser una cadena de texto')
    .isLength({ min: 1, max: 100 })
    .withMessage('El ID del cliente debe tener entre 1 y 100 caracteres'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un artículo en la orden'),
  body('items.*.productId')
    .trim()
    .notEmpty()
    .withMessage('El ID del producto es obligatorio')
    .isString()
    .withMessage('El ID del producto debe ser una cadena'),
  body('items.*.name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio')
    .isString()
    .withMessage('El nombre del producto debe ser una cadena'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  body('status')
    .optional()
    .isIn(OrderStatusValues)
    .withMessage(`El estado debe ser uno de: ${OrderStatusValues.join(', ')}`),
  body('totalAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El monto total debe ser un número mayor o igual a 0'),
];

export const updateOrderSchema: ValidationChain[] = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('El ID de la orden es obligatorio')
    .isString()
    .withMessage('El ID debe ser una cadena de texto'),
  body('customerId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El ID del cliente no puede estar vacío')
    .isString()
    .withMessage('El ID del cliente debe ser una cadena'),
  body('items')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un artículo'),
  body('items.*.productId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El ID del producto es obligatorio'),
  body('items.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio'),
  body('items.*.quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser mayor a 0'),
  body('items.*.price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser mayor o igual a 0'),
  body('status')
    .optional()
    .isIn(OrderStatusValues)
    .withMessage(`El estado debe ser uno de: ${OrderStatusValues.join(', ')}`),
  body('totalAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El monto total debe ser mayor o igual a 0'),
];

export const orderIdParamSchema: ValidationChain[] = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('El ID de la orden es obligatorio')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
    .isLength({ min: 1, max: 100 })
    .withMessage('El ID debe tener entre 1 y 100 caracteres'),
];

export const listOrdersQuerySchema: ValidationChain[] = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un entero entre 1 y 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El offset debe ser un entero mayor o igual a 0'),
  query('status')
    .optional()
    .isIn(OrderStatusValues)
    .withMessage(`El estado debe ser uno de: ${OrderStatusValues.join(', ')}`),
];

export const deleteOrderSchema: ValidationChain[] = orderIdParamSchema;

export const getOrderSchema: ValidationChain[] = orderIdParamSchema;