import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const toggleWishlistAsync = createAsyncThunk(
    'wishlist/toggleAsync',
    async ({ uid, productId }) => {
        const response = await axios.post('http://localhost:5000/api/wishlist/toggle', { uid, productId });
        return response.data; // Returns the updated array of IDs
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: { items: [], status: 'idle' },
    extraReducers: (builder) => {
        builder.addCase(toggleWishlistAsync.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    }
});

export default wishlistSlice.reducer;