// src/components/CheckoutPage/OrderSummary.js

import React from 'react';
import { Button } from 'flowbite-react';

const OrderSummary = ({ cart, loading }) => {
    const subtotal = cart?.products?.reduce((acc, product) => acc + (product.productId.price * product.quantity), 0) || 0;

    return (
        <div className="w-full md:w-1/3 space-y-4 border p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="max-h-64 overflow-y-auto">
                        {cart && cart.products.map(product => (
                            <div key={product.productId._id} className="flex items-center justify-between border-b py-4">
                                <img src={product.productId.imageUrl} alt={product.productId.name} className="w-16 h-16 object-cover rounded-md" />
                                <div className="flex-1 mx-4">
                                    <h3 className="text-md font-semibold">{product.productId.name}</h3>
                                    <p className="text-gray-500">Color: {product.productId.category}</p>
                                    <p>Quantity: {product.quantity}</p>
                                </div>
                                <p className="font-semibold">${(product.productId.price * product.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <input type="text" placeholder="Promo code" className="border p-2 w-full rounded-md" />
                        <Button className="ml-2 bg-gray-800 text-white">Apply</Button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-lg font-semibold">Subtotal</p>
                        <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">Shipping</p>
                        <p className="text-lg font-semibold">Free</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 text-xl font-bold">
                        <p>Total</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
