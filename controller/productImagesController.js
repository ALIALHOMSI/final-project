import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import ProductImage from '../models/productImageModel.js';

const router = express.Router();

// Multer configuration for storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Set the destination folder as 'public'
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now().toString() + Math.floor(Math.random() * 100000000);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueName + fileExtension); // Set the filename as a unique 10-digit number
  },
});

const imageFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg','.png', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only jpg, PNG, and GIF files are allowed.'), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter: imageFilter });

// GET all product images
export const getAllProductImages = async (req, res) => {
  try {
    const productImages = await ProductImage.find();
    res.json(productImages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET a single product image by ID
export const getProductImageById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product image ID' });
  }

  try {
    const productImage = await ProductImage.findById(id);
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    res.json(productImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new product image
export const createProductImage = async (req, res) => {
  try {
    const { productInfoId } = req.body;
    const { filename } = req.file;

    const productImage = new ProductImage({
      productInfoId,
      imageUrl: filename,
    });

    await productImage.save();

    res.status(201).json(productImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product image
export const deleteProductImage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product image ID' });
  }

  try {
    const productImage = await ProductImage.findByIdAndDelete(id);
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Delete the associated image file from the 'public' folder
    const imagePath = path.join(__dirname, '../public', productImage.imageUrl);
    fs.unlinkSync(imagePath);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product image
export const updateProductImage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product image ID' });
  }

  try {
    const { productInfoId } = req.body;
    const { filename } = req.file;

    const productImage = await ProductImage.findByIdAndUpdate(
      id,
      {
        productInfoId,
        imageUrl: filename,
      },
      { new: true }
    );

    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Delete the previous image file from the 'public' folder
    const imagePath = path.join(__dirname, '../public', productImage.imageUrl);
    fs.unlinkSync(imagePath);

    res.json(productImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default {getAllProductImages,getProductImageById,createProductImage,deleteProductImage,updateProductImage}