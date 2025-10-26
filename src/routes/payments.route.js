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

const router = Router();

router.get('/', getAllPayment);
router.post('/', validate(paymentSchema, 'body'), createPayment);
router.put('/:id', validate(paymentSchemaUpdate, 'body'), updatePayment);
router.delete('/:id', deletePayment);

export default router;
