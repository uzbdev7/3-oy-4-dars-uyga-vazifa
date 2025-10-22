import { Router } from 'express';
import customerRoutes from './customer.route.js';
import regionRoutes from './region.route.js';
import waterProRoutes from './water_products.route.js';
import districtRoutes from './district.route.js';

const router = Router();

router.use('/customers', customerRoutes);
router.use('/regions', regionRoutes);
router.use('/products', waterProRoutes);
router.use('/districts', districtRoutes);

export default router;
