
const ProductModel = require('../models/productModel');

// Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
    try {
        const query = req.query.keyword ? { 
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const products = await ProductModel.find(query);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found.'
            });
        }

        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

// Create Product API - POST /api/v1/product/new
exports.createProduct = async (req, res, next) => {
  try {
      // Extract product data from request body
      const { name, price, description, category, seller ,images} = req.body;

      // Create new product instance
      const newProduct = new ProductModel({
          name,
          price,
          description,
          category,
          seller,
          images
      });

      // Save the new product to the database
      await newProduct.save();

      // Respond with success message and created product data
      res.status(201).json({
          success: true,
          message: 'Product created successfully',
          product: newProduct
      });
  } catch (error) {
      // Handle any errors that occur during product creation
      console.error(error);
      res.status(500).json({
          success: false,
          error: 'Internal Server Error'
      });
  }
};


//Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Unable to get Product with that ID'
        })
    }
}
// Delete Single Product API - DELETE /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        
        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete the product
        await ProductModel.findByIdAndDelete(productId);

        // Return success response
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        // Handle errors
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
// Update Single Product API - PUT or PATCH /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updateData = req.body; // Data to update the product

        // Check if the product exists
        let product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Update the product
        product = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });

        // Return success response with updated product data
        res.json({
            success: true,
            product
        });
    } catch (error) {
        // Handle errors
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
