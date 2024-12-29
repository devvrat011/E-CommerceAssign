import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, contactInfo, paymentMethod, totalPrice } = req.body;

        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId'); 
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const orderItems = cart.products.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price, 
            category:item.productId.category ,
            imageUrl: item.productId.imageUrl,
        }));

        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress,
            contactInfo,
            paymentMethod,
            totalPrice,
            isPaid: true,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('orderItems.productId', 'name price') 
            .exec();

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('orderItems.productId', 'name price');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { status, isPaid } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status) order.status = status; 
        if (isPaid !== undefined) { 
            order.isPaid = isPaid;
            order.paidAt = isPaid ? Date.now() : null; 
        }

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
