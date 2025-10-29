import {
    createCustomer,
    getAllCustomer,
    getOneCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controller/customer.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    customerschema,
    customerschemaUpdate,
} from '../validations/customer.validation.js';
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';


const router = Router();


router.get('/', authGuard, getAllCustomer);               
router.get("/:id", authGuard, getOneCustomer);            
router.post('/', authGuard, roleGuard("admin", "client"), validate(customerschema, 'body'), createCustomer);
router.put('/:id', authGuard, roleGuard("admin", "client"), validate(customerschemaUpdate, 'body'), updateCustomer);
router.delete('/:id', authGuard, roleGuard("admin"), deleteCustomer);

export default router;
