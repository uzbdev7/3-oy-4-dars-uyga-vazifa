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
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', getAllOrderItem);
router.post('/',authGuard, roleGuard("admin","client"), validate(order_itemsSchema, 'body'), createOrderItem);
router.put('/:id',authGuard, roleGuard("admin","client"), validate(order_itemsSchemaUpdate, 'body'), updateOrderItem);
router.delete('/:id',authGuard,roleGuard("admin","client"), deleteOrderItem);

export default router;
