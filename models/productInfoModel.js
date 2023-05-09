import mongoose from 'mongoose';

const productInfoSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);

export default ProductInfo;
