import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router = Router();

router.post('/create', ProductControllers.createProduct);
router.patch('/:id', ProductControllers.updateProduct);
router.get('/', ProductControllers.getAllProducts);

export const ProductRoutes = router;