// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String },
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [orderItemSchema], 
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    contactInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal'],
        required: true
    },
    paymentDetails: {
        cardNumber: { type: String },
        expirationDate: { type: String },
        cvc: { type: String }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
