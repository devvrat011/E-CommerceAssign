import Product from "../models/Product.js";

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addProduct = async (req, res) => {
    try {
        const slug = req.body.name
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
        // console.log(req.body);
        const newProduct = new Product({
            ...req.body,
            slug,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); 
    } catch (err) {
        // console.error('Error saving product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProducts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 12;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const products = await Product.find({
       
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        
        ...(req.query.searchTerm && 
            { name: { $regex: req.query.searchTerm, $options: 'i' } }
           
        ),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalProducts = await Product.countDocuments();
  
      
  
      res.status(200).json({
        products,
        totalProducts,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateProduct = async (req, res) => {
   
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
