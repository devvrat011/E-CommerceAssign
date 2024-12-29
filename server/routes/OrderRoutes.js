
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus } from '../controllers/OrderController.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);                 
router.get('/', authMiddleware, getUserOrders);               
router.get('/:id', authMiddleware, getOrderById);             
router.put('/:id', authMiddleware, updateOrderStatus);        

export default router