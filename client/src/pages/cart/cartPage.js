import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { fetchCart, updateCart, removeFromCart } from './cartAction';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, loading, error } = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser._id);
            dispatch(fetchCart(currentUser._id));
        }
    }, [dispatch, currentUser]);
 
    useEffect(() => {
        if (cart?.products) {
            const totalAmount = cart.products.reduce((acc, product) => acc + (product?.productId?.price * product?.quantity), 0);
            setTotal(totalAmount);
        }
    }, );

    const handleIncrease = (productId) => {
        if (currentUser) {
            dispatch(updateCart({ userId: currentUser._id, productId, quantity: 1 })).then(() => {
                dispatch(fetchCart(currentUser._id));
            });
        }
    };

    const handleDecrease = (productId) => {
        if (currentUser) {
            dispatch(updateCart({ userId: currentUser._id, productId, quantity: -1 })).then(() => {
                dispatch(fetchCart(currentUser._id));
            });
        }
    };

    const handleRemove = (productId) => {
        if (currentUser) {
            dispatch(removeFromCart({ userId: currentUser._id, productId })).then(() => {
                dispatch(fetchCart(currentUser._id));
            });
        }
    };
   
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6 flex flex-col md:flex-row">
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <div>
                            {cart && cart.products && cart?.products?.map(product => (
                                <div key={product?.productId?._id} className="flex items-center justify-between border-b py-6">
                                    <div className="flex items-center space-x-4">
                                        <img src={product?.productId?.imageUrl} alt={product?.productId?.name} className="w-24 h-24 object-cover rounded-md" />
                                        <div>
                                            <h2 className="text-lg font-semibold">{product?.productId?.name}</h2>
                                            <p className="text-gray-500">Color: {product?.productId?.category}</p>
                                            <button
                                                onClick={() => handleRemove(product?.productId?._id)}
                                                className="text-red-500 hover:underline mt-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Button onClick={() => {product?.quantity!=1 && handleDecrease(product?.productId?._id)}} className="text-gray-700"><RemoveIcon /></Button>
                                        <span className="text-lg font-medium">{product?.quantity}</span>
                                        <Button onClick={() => handleIncrease(product?.productId?._id)} className="text-gray-700"><AddIcon /></Button>
                                    </div>
                                    <p className="text-lg font-semibold">${product?.productId?.price * product?.quantity}.00</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/3 md:ml-8 mt-8 md:mt-0">
                    <div className="border rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center">
                                <input type="radio" name="shipping" className="mr-2" defaultChecked />
                                Free shipping
                            </label>
                            <span>$0.00</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center">
                                <input type="radio" name="shipping" className="mr-2" />
                                Express shipping
                            </label>
                            <span>+$15.00</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center">
                                <input type="radio" name="shipping" className="mr-2" />
                                Pick Up
                            </label>
                            <span>$21.00</span>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-lg font-semibold">Subtotal</p>
                            <p className="text-lg font-semibold">${total.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 mb-6">
                            <p className="text-xl font-bold">Total</p>
                            <p className="text-xl font-bold">${(total + 15).toFixed(2)}</p> {/* Adjust for selected shipping */}
                        </div>
                        <Button onClick={() => navigate('/checkout')} className="w-full py-3 bg-black text-white font-semibold rounded-lg">
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
