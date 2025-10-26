import {
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
} from '../controller/orders.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    ordersSchema,
    ordersSchemaUpdate,
} from '../validations/orders.validaton.js';

const router = Router();

router.get('/', getAllOrder);
router.post('/', validate(ordersSchema, 'body'), createOrder);
router.put('/:id', validate(ordersSchemaUpdate, 'body'), updateOrder);
router.delete('/:id', deleteOrder);

export default router;
