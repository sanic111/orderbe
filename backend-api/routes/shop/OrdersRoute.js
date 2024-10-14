import express from 'express';
import { getAllOrders, getOrderById, createOrder } from '../../controllers/shop/OrdersController.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);

export default router;