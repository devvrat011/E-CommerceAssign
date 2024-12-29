// src/components/OrdersPage/OrderItem.js

import React from 'react';

const OrderItem = ({ order }) => {
    const { orderItems, totalPrice, createdAt, status } = order;
    console.log(orderItems);
    return (
        <div className="border p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Placed on: {new Date(createdAt).toLocaleDateString()}</h2>
            <p className="text-md font-semibold mb-2">Order Status: {status}</p>
            <div className="max-h-64 overflow-y-auto">
                {orderItems?.map(item => (
                    <div key={item._id} className="flex items-center justify-between border-b py-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1 mx-4">
                            <h3 className="text-md font-semibold">{item.name}</h3>
                            <p className="text-gray-500">Category: {item.category}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-lg font-bold">
                <p>Total Price</p>
                <p>${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderItem;
