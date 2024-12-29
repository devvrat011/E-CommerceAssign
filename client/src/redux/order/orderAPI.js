import axios from 'axios';

export const createOrderAPI = async (orderData) => {
    const response = await axios.post('http://localhost:8000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response;
};
