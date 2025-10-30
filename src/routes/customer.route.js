import {
    getAllCustomer,
    getOneCustomer,
    deleteCustomer,
} from '../controller/customer.controller.js';
import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', authGuard, getAllCustomer);               
router.get("/:id", authGuard, getOneCustomer);            
router.delete('/:id', authGuard, roleGuard("admin"), deleteCustomer);

export default router;
