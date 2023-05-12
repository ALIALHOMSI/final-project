import express from 'express';
import {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getProducts,
} from '../controller/productController.js';

const productRoute = express.Router();

productRoute.post('/create', createProduct);
productRoute.get('/get/:id', getProductById);
productRoute.put('/update/:id', updateProductById);
productRoute.delete('/delete/:id', deleteProductById);
productRoute.get('/getAll', getProducts);

export default productRoute;
