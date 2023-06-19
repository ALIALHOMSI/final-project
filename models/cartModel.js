import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: 'User',
    required: true,
    path: '_id', 
  },
  productInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductInfo',
    required: true,
  },
  productImageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductImage',
    required: true,
  },
  cartItemQuantity: {
    type: Number,
    required: true,
  }
});
 
export default mongoose.model('Cart', cartSchema);
 