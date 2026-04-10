import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiClient from '../api/axiosConfig';

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (uid) => {
    const response = await apiClient.get(`cart/${uid}`);
    return response.data; // Should return the cart array from MongoDB
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ uid, product }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('cart/add', {
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
    const response = await apiClient.post('cart/remove', { uid, productId });
    return response.data;
  }
);

export const decrementQuantityAsync = createAsyncThunk(
  'cart/decrementQuantityAsync',
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('cart/decrement', {
        uid,
        productId,
      });
      return response.data; // Returns the updated cart from MongoDB
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const incrementQuantityAsync = createAsyncThunk(
  'cart/incrementQuantityAsync',
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('cart/increment', {
        uid,
        productId,
      });
      return response.data; // Returns the updated cart from MongoDB
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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
      const existing = state.items.find(item => item._id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.totalQuantity += 1
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item) state.totalQuantity -= item.quantity
      state.items = state.items.filter(item => item._id !== action.payload)
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item._id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        state.totalQuantity--;
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Load cart from MongoDB on login/refresh
        state.items = action.payload.map(item => ({
            _id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      })
      .addCase(fetchCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Sync Redux state with the ground truth from MongoDB
        state.items = action.payload.map(item => ({
            _id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      })
      // Add this inside your extraReducers builder
      .addCase(decrementQuantityAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
            _id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      })
      .addCase(incrementQuantityAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
            _id: item.productId,
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

export const { addToCart, removeFromCart, decrementQuantity, incrementQuantity } = cartSlice.actions
export default cartSlice.reducer