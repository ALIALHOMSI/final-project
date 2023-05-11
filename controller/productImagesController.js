import multer from 'multer';
import path from 'path';
import ProductImage from '../models/productImageModel.js';

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// configure multer file filter
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
  }
};

// configure multer upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

// CREATE product image
async function createProductImage(req, res) {
  try {
    const productImage = new ProductImage({
      productInfoId: req.body.productInfoId,
      imageUrl: req.file.path,
    });
    const savedProductImage = await productImage.save();
    res.status(201).json(savedProductImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// READ all product images
async function getAllProductImages(req, res) {
  try {
    const productImages = await ProductImage.find();
    res.json(productImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE product image
async function updateProductImage(req, res) {
  try {
    res.productImage.productInfoId = req.body.productInfoId;
    if (req.file) {
      res.productImage.imageUrl = req.file.path;
    }
    const updatedProductImage = await res.productImage.save();
    res.json(updatedProductImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE product image
async function deleteProductImage(req, res) {
  try {
    await res.productImage.remove();
    res.json({ message: 'Product image deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// middleware function to get a product image by ID
async function getProductImage(req, res, next) {
  let productImage;
  try {
    productImage = await ProductImage.findById(req.params.id);
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.productImage = productImage;
  next();
}

export { createProductImage, getAllProductImages, updateProductImage, deleteProductImage, getProductImage };
