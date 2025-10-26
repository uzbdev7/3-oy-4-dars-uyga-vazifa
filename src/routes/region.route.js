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

const router = Router();

router.get('/', getAllRegion);
router.post('/', validate(regionschema, 'body'), createRegion);
router.put('/:id', validate(regionschemaUpdate, 'body'), updateRegion);
router.delete('/:id', deleteRegion);

export default router;

