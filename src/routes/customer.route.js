import {
    createCustomer,
    getAllCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controller/customer.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    customerschema,
    customerschemaUpdate,
} from '../validations/customer.validation.js';

const router = Router();


router.get('/', getAllCustomer);
router.post('/', validate(customerschema, 'body'), createCustomer);
router.put('/:id', validate(customerschemaUpdate, 'body'), updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
