import { useState, useEffect } from "react";
import React from "react";
import Footer from '../../components/Footer.js';
import Navbar from '../../components/Navbar.js';
import { Button, Modal, TextInput, Label } from "flowbite-react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    productFetchStart,
    productFetchSuccess,
    productFetchFailure,
} from '../../redux/product/productSlice.js';
import Card from "../../components/card.js";
import { updateCart } from "../cart/cartAction.js";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Newsletter from "../../components/newsletter.js";

const ProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const { products, error: errorMessage } = useSelector((state) => state.product);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        imageUrl: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });
  
    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Could not remove item from cart');
            }
            navigate('/');
        } catch (error) {
            console.error(error.message);
            navigate('/');
        }
    };

    
    const handleIncrease = (productId) => {
        if (currentUser) {
            dispatch(updateCart({ userId: currentUser._id, productId, quantity: 1 }));
        } else {
            console.log('User not logged in');
        }
    };

    const handleUpdate = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Could not update the product');
            }
            setProduct(data);
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(productFetchStart());
                const res = await fetch(`http://localhost:8000/api/products?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    dispatch(productFetchSuccess(data.products));
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                dispatch(productFetchFailure(error.message));
                console.log('Error fetching products:', error.message);
            }
        };
        fetchProducts();
    }, [dispatch]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:8000/api/products?slug=${productSlug}`);
                const data = await res.json();
                if (res.ok) {
                    setProduct(data.products[0]);
                    setUpdatedProduct(data.products[0]);
                    setLoading(false);
                    setError(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
                console.log('Error fetching product:', error.message);
            }
        };
        fetchProduct();
    }, [productSlug]);

    return (
        <div className="border-2 bg-gray-100">
            <Navbar />
            <div className="px-[2%] mt-[6%] ">
                <div className="relative h-[45%] flex justify-evenly">
                    <div className="w-[40%] md:w-[25%] flex rounded-xl flex-col justify-center">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-[50%]">
                                <img src={product?.imageUrl} className="rounded-xl w-full md:w-[70%] h-[90%] mx-auto" alt={product?.name} />
                            </div>
                        ))}
                    </div>
                    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg space-y-6">
                        {/* Delete Button */}
                        {currentUser?.isAdmin && ( // Show delete button only for admin users
                            <div className="absolute top-4 right-4">
                                <Button color="red" onClick={() => handleDelete(product?._id)}>
                                    <DeleteIcon />
                                </Button>
                            </div>
                        )}
                        <div className="flex flex-col items-start space-y-2">
                            <div className="flex items-center space-x-2">
                                <span>★★★★★</span>
                                <span className="text-gray-500">11 Reviews</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">{product?.name}</h1>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-700 h-40 overflow-y-auto">
                            <div dangerouslySetInnerHTML={{ __html: product?.description || "Product description goes here." }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-800">${product?.price}</span>
                        </div>
                        <div className="mt-2 space-y-1">
                            <span className="font-semibold text-gray-700">Measurements:</span>
                            <p className="text-gray-600">Length: 10 cm, Width: 5 cm</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xl font-semibold text-gray-800">Stock: {product?.stock}</span>
                        </div>
                        <div className="mt-4 space-y-1">
                            <span className="font-semibold text-gray-700">Choose Color:</span>
                            <div className="flex space-x-2">
                                {['red-500', 'blue-500', 'green-500'].map((color, idx) => (
                                    <div key={idx} className={`h-8 w-8 rounded-full bg-${color} cursor-pointer border border-gray-300`} />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                            <Button onClick={() => { handleIncrease(product?._id) }} gradientDuoTone="purpleToBlue">
                                <AddShoppingCartIcon /> <span className="ml-1"> Add to Cart</span>
                            </Button>
                            <FavoriteBorderIcon className="text-gray-600 cursor-pointer" />
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="space-y-2">
                            <span className="font-semibold text-gray-700">Additional Info:</span>
                            <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-700 h-40 overflow-y-auto">
                                <div dangerouslySetInnerHTML={{ __html: product?.description || "Additional product information goes here." }}></div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-300" />
                    </div>
                </div>
            </div>
            <div className="p-[2%]">
                <div className="text-2xl font-bold">You might also like</div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 h-64 w-[100%] mx-auto">
                    {products?.length > 0 && products?.map((card) => (
                        <Card key={card._id} card={card} />
                    ))}
                </div>
                <div className="text-center w-full">
                    <button onClick={() => navigate('/shop')} className='w-full text-teal-500 self-center text-sm py-1'>
                        Show more
                    </button>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
};

export default ProductPage;
