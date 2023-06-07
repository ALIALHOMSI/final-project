import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import ProductImage from '../models/productImageModel.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer configuration
const storage = multer.diskStorage({
  destination: join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a product image
const createProductImage = async (req, res) => {
  try {
    // Check if the request contains an image
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new ProductImage instance
    const productImage = new ProductImage({
      productInfoId: req.body.productInfoId,
      imageUrl: result.secure_url,
    });

    // Save the product image to MongoDB
    await productImage.save();

    // Return a response with the saved product image
    return res.json({ message: 'Image uploaded successfully', productImage });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all product images
const getAllProductImages = async (req, res) => {
  try {
    // Retrieve all product images from MongoDB
    const productImages = await ProductImage.find();

    // Return a response with the product images
    return res.json(productImages);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single product image by ID
const getProductImageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the product image from MongoDB
    const productImage = await ProductImage.findById(id);

    // Check if the product image exists
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }

    // Fetch the image from Cloudinary
    const result = await cloudinary.uploader.upload(productImage.imageUrl);

    // Update the product image's imageUrl with the secure URL from Cloudinary
    productImage.imageUrl = result.secure_url;

    // Return a response with the product image
    return res.json(productImage);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a product image by ID
// Update a product image by ID
const updateProductImageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the product image from MongoDB
    const productImage = await ProductImage.findById(id);

    // Check if the product image exists
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }

    // Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(productImage.publicId);

    // Update the product image's imageUrl and publicId with the new values
    productImage.imageUrl = result.secure_url;
    productImage.publicId = result.public_id;

    // Save the updated product image to MongoDB
    await productImage.save();

    // Return a response with the updated product image
    return res.json({ message: 'Product image updated successfully', productImage });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete a product image by ID
// Delete a product image by ID
const deleteProductImageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the product image from MongoDB
    const productImage = await ProductImage.findById(id);

    // Check if the product image exists
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(productImage.publicId);

    // Remove the product image from MongoDB
    await ProductImage.findByIdAndRemove(id);

    // Return a response indicating successful deletion
    return res.json({ message: 'Product image deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

import path from 'path';
import fs from 'fs';

export const getImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../uploads', filename);

  // Check if the file exists
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      return res.status(404).json({ error: 'Image not found' });
    }

    // Stream the image file as the response
    res.sendFile(imagePath);
  });
};

export {
  createProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImageById,
  deleteProductImageById,
  
};
