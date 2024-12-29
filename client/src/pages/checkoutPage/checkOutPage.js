// src/components/CheckoutPage/CheckoutPage.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../cart/cartAction';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Newsletter from '../../components/newsletter';
const CheckoutPage = () => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchCart(currentUser._id));
        }
    }, [dispatch, currentUser]);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6 flex flex-col md:flex-row space-y-8 md:space-y-0">
                <CheckoutForm />
                <OrderSummary cart={cart} loading={loading} />
            </div>
            <Newsletter/>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
