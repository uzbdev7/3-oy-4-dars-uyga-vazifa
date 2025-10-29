import {
    createRegion,
    getAllRegion,
    updateRegion,
    deleteRegion,
} from '../controller/region.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    regionschema,
    regionschemaUpdate,
} from '../validations/region.validation.js';
import { authGuard } from '../middleware/authGuard.js';
import { roleGuard } from '../middleware/roleGuard.js';

const router = Router();

router.get('/', getAllRegion);
router.post('/', authGuard, roleGuard("admin","client"), validate(regionschema, 'body'), createRegion);
router.put('/:id',authGuard, roleGuard("admin","client"), validate(regionschemaUpdate, 'body'), updateRegion);
router.delete('/:id',authGuard, roleGuard("admin","client"), deleteRegion);

export default router;

