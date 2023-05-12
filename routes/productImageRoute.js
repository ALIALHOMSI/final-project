import express from 'express';
import {
  createProductImage,
  getProductImage,
  updateProductImage,
  deleteProductImage,
  getAllProductImages,
} from '../controller/productImagesController.js';
import upload from '../utils/multer.js';

const productImageRoute = express.Router();

productImageRoute.post('/create', upload.single('image'), createProductImage);
productImageRoute.get('/get/:id', getProductImage);
productImageRoute.put('/update/:id', updateProductImage);
productImageRoute.delete('/delete/:id', deleteProductImage);
productImageRoute.get('/getAll', getAllProductImages);

export default productImageRoute;
