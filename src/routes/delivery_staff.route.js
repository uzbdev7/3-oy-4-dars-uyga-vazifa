import {
    getAllDelivery,
    deleteDelivery,
} from '../controller/delivery_staff.controller.js';
import { Router } from 'express';

import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', authGuard, getAllDelivery);
router.delete('/:id',authGuard,roleGuard("admin","client"), deleteDelivery);

export default router;
