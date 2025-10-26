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

const router = Router();

router.get('/', getAllDelivery);
router.post('/', validate(staffSchema, 'body'), createDelivery);
router.put('/:id', validate(staffSchemaUpdate, 'body'), updateDelivery);
router.delete('/:id', deleteDelivery);

export default router;
