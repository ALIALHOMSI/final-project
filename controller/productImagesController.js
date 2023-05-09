import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import ProductImage from '../models/productImageModel.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // set the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extension && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG image files are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export const createProductImage = async (req, res) => {
  try {
    const { productInfoId } = req.body;

    const productImage = new ProductImage({ productInfoId, imageUrl: req.file.path });
    await productImage.save();

    res.status(201).json(productImage);
  } catch (error) {
    // if an error occurs, delete the uploaded file
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error(err);
      });
    }

    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const getProductImages = async (req, res) => {
  try {
    const productImages = await ProductImage.find();
    res.json(productImages);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const getProductImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const productImage = await ProductImage.findById(id);
    if (!productImage) {
      return res.status(404).json({ message: 'ProductImage not found.' });
    }

    res.json(productImage);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.error(error);
  }
};

export const updateProductImageById = async (req, res) => {
    try {
      const { id } = req.params;
      const { productInfoId } = req.body;
  
      const productImage = await ProductImage.findById(id);
      if (!productImage) {
        return res.status(404).json({ message: 'ProductImage not found.' });
      }
  
      // delete the old image file
      fs.unlink(productImage.imageUrl, (err) => {
        if (err) console.error(err);
      });
  
      // update the product image with the new image file
      productImage.productInfoId = productInfoId;
      productImage.imageUrl = req.file.path;
      await productImage.save();
  
      res.json(productImage);
    } catch (error) {
      // if an error occurs, delete the uploaded file
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error(err);
        });
      }
  
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };

  export const deleteProductImageById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const productImage = await ProductImage.findById(id);
      if (!productImage) {
        return res.status(404).json({ message: 'ProductImage not found.' });
      }
  
      // delete the image file
      fs.unlink(productImage.imageUrl, (err) => {
        if (err) console.error(err);
      });
  
      // delete the product image document from the database
      await productImage.delete();
  
      res.json({ message: 'ProductImage deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.error(error);
    }
  };

  export default{getProductImages,getProductImageById,createProductImage,updateProductImageById,deleteProductImageById}
  
