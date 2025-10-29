import {
    createDelivery,
    getAllDelivery,
    updateDelivery,
    deleteDelivery,
} from '../controller/delivery_staff.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    staffSchema,
    staffSchemaUpdate,
} from '../validations/delivery_staff.validation.js';
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', authGuard, getAllDelivery);
router.post('/',authGuard,roleGuard("admin","client"), validate(staffSchema, 'body'), createDelivery);
router.put('/:id',authGuard,roleGuard("admin","client"), validate(staffSchemaUpdate, 'body'), updateDelivery);
router.delete('/:id',authGuard,roleGuard("admin","client"), deleteDelivery);

export default router;
