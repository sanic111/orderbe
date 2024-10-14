import express from 'express';
import authRouter from './AuthRoute.js';
import carRouter from './CarRoute.js';
import customerRouter from './CustomerRoute.js';
import { getAllSettings } from '../../controllers/shop/SettingController.js';
import { verifyToken } from '../../middleware/Auth.js';
import { requestTestDrive } from '../../controllers/shop/TestDrive.js';
import ordersRouter from './OrdersRoute.js';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/car', carRouter);
router.use('/customer', customerRouter);
router.use('/orders', ordersRouter);
router.get('/settings', getAllSettings);
router.route('/test-drive-request').post(requestTestDrive);

export default router;