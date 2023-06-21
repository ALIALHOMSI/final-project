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
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex'],
    required: true,
  },
  type: {
    type: String,
    enum: ['shirt', 'pants', 'shoes'],
    required: true,
  },
});


const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);

export default ProductInfo;
