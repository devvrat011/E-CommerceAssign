// src/components/OrdersPage/OrdersPage.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../redux/order/orderSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OrderItem from './OrderItem';
import Newsletter from '../../components/newsletter';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state) => state.order);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchOrders());
        }
    }, [dispatch, currentUser]);
    console.log(order);
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : order && order.length ? (
                    order.map(order => (
                        <OrderItem key={order._id} order={order} />
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
};

export default OrdersPage;
