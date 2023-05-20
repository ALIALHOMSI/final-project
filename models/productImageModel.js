import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  productInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductInfo',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);

export default ProductImage;