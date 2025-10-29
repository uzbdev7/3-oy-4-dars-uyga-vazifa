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
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', getAllOrder);
router.post('/',authGuard, roleGuard("admin","client"), validate(ordersSchema, 'body'), createOrder);
router.put('/:id',authGuard, roleGuard("admin","client"), validate(ordersSchemaUpdate, 'body'), updateOrder);
router.delete('/:id',authGuard, roleGuard("admin","client"), deleteOrder);

export default router;
