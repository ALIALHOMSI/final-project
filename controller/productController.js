import Product from '../models/productModel.js';
import multer from 'multer';

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Initialize multer upload with storage engine
const upload = multer({ storage: storage });

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { product_id, name, description, price, instock } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const newProduct = new Product({
      product_id,
      name,
      description,
      price,
      instock,
      imageUrl,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
const updateProductById = async (req, res) => {
  try {
    const { product_id, name, description, price, instock } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.product_id = product_id;
    product.name = name;
    product.description = description;
    product.price = price;
    product.instock = instock;
    product.imageUrl = imageUrl;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, upload };

