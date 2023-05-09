import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = new Product({ name, description, price });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true } // return the updated document
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json({ message: 'Product deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};
export default {getProducts,getProductById,createProduct,updateProductById,deleteProductById}