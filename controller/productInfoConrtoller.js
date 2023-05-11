  import ProductInfo from '../models/productInfoModel.js';

  export const createProductInfo = async (req, res) => {
    try {
      const { productId, color, size, quantity } = req.body;

      const productInfo = new ProductInfo({ productId, color, size, quantity });
      await productInfo.save();

      res.status(201).json(productInfo);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };

  export const getProductInfos = async (req, res) => {
    try {
      const productInfos = await ProductInfo.find();
      res.json(productInfos);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };

  export const getProductInfoById = async (req, res) => {
    try {
      const { id } = req.params;

      const productInfo = await ProductInfo.findById(id);
      if (!productInfo) {
        return res.status(404).json({ message: 'ProductInfo not found.' });
      }

      res.json(productInfo);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };

  export const updateProductInfoById = async (req, res) => {
    try {
      const { id } = req.params;
      const { productId, color, size, quantity } = req.body;

      const productInfo = await ProductInfo.findByIdAndUpdate(
        id,
        { productId, color, size, quantity },
        { new: true } // return the updated document
      );
      if (!productInfo) {
        return res.status(404).json({ message: 'ProductInfo not found.' });
      }

      res.json(productInfo);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };

  export const deleteProductInfoById = async (req, res) => {
    try {
      const { id } = req.params;

      const productInfo = await ProductInfo.findByIdAndDelete(id);
      if (!productInfo) {
        return res.status(404).json({ message: 'ProductInfo not found.' });
      }

      res.json({ message: 'ProductInfo deleted.' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };
  export default {getProductInfos,getProductInfoById,createProductInfo,updateProductInfoById,deleteProductInfoById}