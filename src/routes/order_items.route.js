import {
    createOrderItem,
    getAllOrderItem,
    updateOrderItem,
    deleteOrderItem,
} from '../controller/order_items.controller.js';
import { Router } from 'express';
import {
    order_itemsSchema,
    order_itemsSchemaUpdate,
} from '../validations/order_items.validation.js';
import { validate } from '../validations/validation.js';

const router = Router();

router.get('/', getAllOrderItem);
router.post('/', validate(order_itemsSchema, 'body'), createOrderItem);
router.put('/:id', validate(order_itemsSchemaUpdate, 'body'), updateOrderItem);
router.delete('/:id', deleteOrderItem);

export default router;
