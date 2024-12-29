// redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderAPI } from './orderAPI.js';
import axios from 'axios';
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await createOrderAPI(orderData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const token = localStorage.getItem('token');  
    const response = await axios.get(`http://localhost:8000/api/orders/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default orderSlice.reducer;
