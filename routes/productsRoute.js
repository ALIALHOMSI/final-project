import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, upload } from '../controller/productController.js';

const router = express.Router();

// Set up a route for creating a new product with image upload
router.post('/products', upload.single('image'), createProduct);

// Set up a route for getting all products
router.get('/products', getAllProducts);

// Set up a route for getting a single product by ID
router.get('/products/:id', getProductById);

// Set up a route for updating a product by ID with image upload
router.put('/products/:id', upload.single('image'), updateProductById);

// Set up a route for deleting a product by ID
router.delete('/products/:id', deleteProductById);

export default router;
