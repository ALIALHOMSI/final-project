import express from 'express';
import {
  createProductInfo,
  getProductInfoById,
  updateProductInfoById,
  deleteProductInfoById,
  getProductInfos,
} from '../controllers/productInfoConrtoller.js';

const router = express.Router();

router.post('/create', createProductInfo);
router.get('/get/:id', getProductInfoById);
router.put('/update/:id', updateProductInfoById);
router.delete('/delete/:id', deleteProductInfoById);
router.get('/getAll', getProductInfos);

export default router;
