import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (uid) => {
    const response = await axios.get(`http://localhost:5000/api/cart/${uid}`);
    return response.data; // Should return the cart array from MongoDB
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ uid, product }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        uid,
        product,
      });
      return response.data; // This is the updated cart from MongoDB
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async ({ uid, productId }) => {
    const response = await axios.post('http://localhost:5000/api/cart/remove', { uid, productId });
    return response.data;
  }
);

const initialState = {
  items: [],
  totalQuantity: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.totalQuantity += 1
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) state.totalQuantity -= item.quantity
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        state.totalQuantity--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Sync Redux state with the ground truth from MongoDB
        state.items = action.payload.map(item => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToCart, removeFromCart, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer