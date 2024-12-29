import express from 'express';
import { getCart,addToCart,removeFromCart,DeleteCart } from '../controllers/cartController.js';
const router = express.Router();

router.get('/', 
  
     getCart);
router.post('/',
    
     addToCart);
router.delete('/',
 
      removeFromCart);
router.delete('/:cartId', DeleteCart);
export default router;