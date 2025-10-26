import {
    createDistrict,
    getAllDistrict,
    updateDistrict,
    deleteDistrict,
} from '../controller/district.controller.js';
import { Router } from 'express';
import { validate } from '../validations/validation.js';
import {
    districtschema,
    districtschemaUpdate,
} from '../validations/district.validation.js';

const router = Router();


router.get('/', getAllDistrict);
router.post('/', validate(districtschema, 'body'), createDistrict);
router.put('/:id', validate(districtschemaUpdate, 'body'), updateDistrict);
router.delete('/:id', deleteDistrict);

export default router;
