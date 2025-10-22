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

router.get('/', getAll);
router.post('/', validate(waterProschema, 'body'), createWaterPro);
router.put('/:id', validate(waterProschemaUpdate, 'body'), updateWaterPro);
router.delete('/:id', deleteWaterPro);

export default router;
