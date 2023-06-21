import express from 'express';
import {
  createProductInfo,
  getProductInfoById,
  updateProductInfoById,
  deleteProductInfoById,
  getProductInfos,
} from '../controller/productInfoConrtoller.js';

const productInfoRoute = express.Router();

productInfoRoute.post('/create', createProductInfo);
productInfoRoute.get('/get/:id', getProductInfoById);
productInfoRoute.put('/update/:id', updateProductInfoById);
productInfoRoute.delete('/delete/:id', deleteProductInfoById);
productInfoRoute.get('/getAll', getProductInfos);
 
export default productInfoRoute; 