// src/components/CheckoutPage/CheckoutForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '../cart/cartAction';
import axios from 'axios';
const CheckoutForm = () => {
    const [contactInfo, setContactInfo] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '' });
    const [shippingAddress, setShippingAddress] = useState({ address: '', city: '', state: '', zipCode: '', country: '' });
    const paymentMethod = "Credit Card";  // Static for simplicity, can be dynamic
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const subtotal = cart?.products?.reduce((acc, product) => acc + (product.productId.price * product.quantity), 0) || 0;
        
        // Create the order data
        const orderData = {
            orderItems: cart._id,
            shippingAddress,
            contactInfo,
            paymentMethod,
            totalPrice: subtotal.toFixed(2),
        };

        
        dispatch(createOrder(orderData));

        try {
            await axios.delete(`/api/cart/${cart._id}`);
           
        } catch (error) {
           
        }

        navigate('/orders');
    };
    return (
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-6">
           
            <div className="border p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={contactInfo.firstName}
                        onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                        className="w-1/2 border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={contactInfo.lastName}
                        onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                        className="w-1/2 border p-2 rounded-md"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={contactInfo.phoneNumber}
                    onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })}
                    className="w-full border p-2 mt-4 rounded-md"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full border p-2 mt-4 rounded-md"
                />
            </div>

            {/* Shipping Address */}
            <div className="border p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full border p-2 rounded-md"
                />
                <div className="flex space-x-4 mt-4">
                    <input
                        type="text"
                        placeholder="Country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-1/2 border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="City / Town"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-1/2 border p-2 rounded-md"
                    />
                </div>
                <div className="flex space-x-4 mt-4">
                    <input
                        type="text"
                        placeholder="State"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-1/2 border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className="w-1/2 border p-2 rounded-md"
                    />
                </div>
            </div>

            {/* Payment Method */}
            <div className="border p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <label className="flex items-center mb-4">
                    <input type="radio" name="payment" value="Credit Card" className="mr-2" defaultChecked />
                    <span>Pay by Card Credit</span>
                </label>
                <label className="flex items-center mb-4">
                    <input type="radio" name="payment" value="Paypal" className="mr-2" />
                    <span>Paypal</span>
                </label>
                <input type="text" placeholder="Card Number" className="w-full border p-2 rounded-md mt-2" />
                <div className="flex space-x-4 mt-4">
                    <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded-md" />
                    <input type="text" placeholder="CVC code" className="w-1/2 border p-2 rounded-md" />
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 mt-6 rounded-lg font-semibold">
                    Place Order
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
