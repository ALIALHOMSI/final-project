import Cart from '../models/cartModel.js';

// Create a new item in the cart
export const createCartItem = async (req, res) => {
  try {
    const { userId, productInfoId, productImageId, cartItemQuantity } = req.body;
    const newCartItem = new Cart({
      userId,
      productInfoId,
      productImageId,
      cartItemQuantity,
    });
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all items in the cart
export const getAllCartItems = async (req, res) => {
  try { 
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a specific item in the cart by its ID
export const getCartItemById = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a specific item in the cart by its ID
export const updateCartItemById = async (req, res) => {
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      req.params.cartItemId,
      req.body,
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(updatedCartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a specific item in the cart by its ID
export const deleteAllCartItems = async (req, res) => {
  try {
    const deletedCartItems = await Cart.deleteMany();
    if (deletedCartItems.deletedCount === 0) {
      return res.status(404).json({ error: 'No cart items found' });
    }
    res.json({ message: 'All cart items deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


export default {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItemById,
  deleteAllCartItems,
};
 