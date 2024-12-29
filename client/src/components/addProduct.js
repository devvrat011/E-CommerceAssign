import React from "react";
import { useState, useRef, useEffect } from "react";
import { FloatingLabel, Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Spinner } from "flowbite-react";
import {
    updateStart,
    updateSuccess,
    updateFailure,
} from '../redux/product/productSlice.js';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

const AddProduct = ({ open, setOpen }) => {
    // Define states for various data and UI states
    const navigate=useNavigate();
    const [publishError, setPublishError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        category: '',
        price: '',
        stock: '',    
    });

    // Redux hooks
    const {products,loading,error:errorMessage}=useSelector((state) => state.product);
    const {currentUser}=useSelector((state)=>state.user);
    const dispatch = useDispatch();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            dispatch(updateStart());
            const res = await fetch('http://localhost:8000/api/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            // console.log(data);
            if (!res.ok) {
                // console.log("Hi I am here!");
                dispatch(updateFailure(data.message));
                return;
            }
            
            if (res.ok) {
                let updatedProducts;
                updatedProducts = [...products, data];
                dispatch(updateSuccess(updatedProducts));
                navigate('/');
            }
        } catch (error) {
            dispatch(updateFailure('Something went wrong'));
            navigate('/');
        }
    };

    // Handle image file selection
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    // Upload image to Firebase Storage
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);
    
    const uploadImage = async () => {

        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                  
                    setFormData({ ...formData, imageUrl: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };
    return (
        <div className={`z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center `}>
            <div className=" bg-black bg-opacity-50 w-full h-full absolute" onClick={() => navigate('/')}></div>
            <div className="bg-white w-4/5  p-8 relative">
                <div className="absolute top-[4%] right-[4%] cursor-pointer" onClick={() => navigate('/')}>
                    Close
                </div>
                <div className="" >
                    <div className="text-2xl md:text-3xl pb-2 mb-4 font-bold">
                        Add New Product
                    </div>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        ref={filePickerRef}
                        hidden
                    />
                    <div onClick={() => filePickerRef.current.click()} className="md:absolute md:top-[15%] md:right-[8%]  rounded-full h-28 w-28 md:h-40 md:w-40  mx-auto my-2  ">
                        {imageFileUploadProgress && (
                            <CircularProgressbar
                                value={imageFileUploadProgress || 0}
                                text={`${imageFileUploadProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    },
                                    path: {
                                        stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                                            })`,
                                    },
                                }}
                            />
                        )}
                        <img
                             src={imageFileUrl}
                            alt='user'
                            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
                                imageFileUploadProgress < 100 &&
                                'opacity-60'
                                }`}
                        />
                        {imageFileUploadError && (
                            <Alert color='failure'>{imageFileUploadError}</Alert>
                        )}
                    </div>
                    <div className="mb-4 md:w-[70%] w-full">
                        <FloatingLabel variant="standard" label="Name" name="name" className="text-black" type="text"
                            onChange={handleChange} required />
                    </div>
                    <label className="block text-black text-sm  mb-2">Description</label>
                    {/* <div className="mb-4 h-24  w-[70%]"> */}
                    <ReactQuill
                        theme='snow'
                        placeholder='Write something...'
                        className='h-12 md:w-[70%] w-full mb-24 md:mb-16'
                        onChange={(value) => {
                            setFormData({ ...formData, description: value });
                        }}
                    />
                    {/* </div> */}
                    <div className="flex w-full justify-between">
                        <div className="mb-4  w-[50%] md:w-[35%]">
                            <label htmlFor="category" className="block text-gray-600 text-sm font-semibold mb-2">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Living Room">Living Room</option>
                                <option value="Bedroom">Bedroom</option>
                                <option value="Kitchen">Kitchen</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="mb-4 w-[40%]">
                            <FloatingLabel variant="standard" name="price" label="Price/Qty" className="text-black"
                                onChange={handleChange}
                                 required />
                        </div>
                        <div className="mb-4 w-[40%]">
                            <FloatingLabel variant="standard" name="stock" label="Stock" className="text-black"
                                onChange={handleChange} 
                                required />
                        </div>
                    </div>
                    <div className="flex justify-center  md:justify-end ">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                           {loading ? (
                            <div className="justify-center border-2 mx-auto">
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </div>
                        ) : (
                            <div>Add Product</div>)} 
                        </button>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}
export default AddProduct;