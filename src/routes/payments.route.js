import {
    createPayment,
    getAllPayment,
    updatePayment,
    deletePayment,
} from '../controller/payments.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    paymentSchema,
    paymentSchemaUpdate,
} from '../validations/payments.validation.js';
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', getAllPayment);
router.post('/',authGuard,roleGuard("admin","client"), validate(paymentSchema, 'body'), createPayment);
router.put('/:id',authGuard, roleGuard("admin","client"), validate(paymentSchemaUpdate, 'body'), updatePayment);
router.delete('/:id',authGuard, roleGuard("admin","client"), deletePayment);

export default router;
