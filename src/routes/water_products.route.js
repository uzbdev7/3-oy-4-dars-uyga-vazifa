import {
    createWaterPro,
    getAll,
    updateWaterPro,
    deleteWaterPro,
} from '../controller/water_products.controller.js';
import { Router } from 'express';
const router = Router();
import { validate } from '../validations/validation.js';
import {
    waterProschema,
    waterProschemaUpdate,
} from '../validations/water_product.validation.js';
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

router.get('/', getAll);
router.post('/',authGuard, roleGuard("admin","client"), validate(waterProschema, 'body'), createWaterPro);
router.put('/:id',authGuard,roleGuard("admin","client"), validate(waterProschemaUpdate, 'body'), updateWaterPro);
router.delete('/:id',authGuard,roleGuard("admin","client"), deleteWaterPro);

export default router;
