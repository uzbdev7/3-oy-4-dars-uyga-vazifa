import { Router } from 'express';
import customerRoutes from './customer.route.js';
import regionRoutes from './region.route.js';
import waterProRoutes from './water_products.route.js';
import districtRoutes from './district.route.js';
import deliveryRoutes from './delivery_staff.route.js';
import orderItemRoutes from './order_items.route.js';
import ordersRoutes from './orders.route.js';
import paymentRoutes from './payments.route.js';
import userRoutes from './auth.route.js'

const router = Router();

router.use('/customers', customerRoutes);
router.use('/regions', regionRoutes);
router.use('/products', waterProRoutes);
router.use('/districts', districtRoutes);
router.use('/deliveries', deliveryRoutes);
router.use('/orderItems', orderItemRoutes);
router.use('/orders', ordersRoutes);
router.use('/payments', paymentRoutes);
router.use('/users',userRoutes);

export default router;
