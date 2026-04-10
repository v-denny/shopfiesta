import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiClient from '../api/axiosConfig'; // Import the custom axios instance

export const fetchWishlistAsync = createAsyncThunk(
    'wishlist/fetchAsync',
    async (uid, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/wishlist/${uid}`);
            return response.data; // Returns the array of wishlist product IDs
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch wishlist');
        }
    }
);

export const toggleWishlistAsync = createAsyncThunk(
    'wishlist/toggleAsync',
    async ({ uid, productId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/wishlist/toggle', { uid, productId });
            return response.data; // Returns the updated array of IDs
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to toggle wishlist');
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: { items: [], status: 'idle', error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchWishlistAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(toggleWishlistAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(toggleWishlistAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default wishlistSlice.reducer;