const Product = require('../models/Product.model');

// GET - Get all products 
exports.getProducts = async (request, h) => {
    try {
        const products = await Product.find().populate('category', 'name');
        return h.response(products).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

// GET - Hämta en enskild produkt med ID
exports.getProductById = async (request, h) => {
    const ProductID = request.params.id;

    try {
        // findById letar automatiskt efter _id i MongoDB
        const product = await Product.findById(ProductID).populate('category', 'name');
        
        if (!product) {
            return h.response("Product not found").code(404);
        }
        return h.response(product).code(200);
    } catch (error) {
        return h.response("There was an error: " + error.message).code(500);
    }
};
// POST - Create a product with image upload
exports.createProduct = async (request, h) => {
    try {
        const data = request.payload;

        if (!data.image) {
            return h.response({ error: 'Du måste ladda upp en bild' }).code(400);
        }

        const newProduct = new Product({
            name: data.name,
            description: data.description,
            price: data.price,
            stockQuantity: data.stockQuantity,
            size: data.size,
            color: data.color,
            category: data.category, // This should be a valid Category ID
            image: {
                data: data.image, // Hapi outputs this file data directly as a Buffer
                contentType: data.image.hapi ? data.image.hapi.headers['content-type'] : 'image/jpeg'
            }
        });

        const savedProduct = await newProduct.save();
        return h.response({ message: 'Produkt skapad!', product: savedProduct }).code(201);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

// PUT - Update full product details
exports.updateProduct = async (request, h) => {
    try {
        const data = request.payload;
        let updateData = { ...data };

        // If a new image file is uploaded during update
        if (data.image) {
            updateData.image = {
                data: data.image,
                contentType: data.image.hapi ? data.image.hapi.headers['content-type'] : 'image/jpeg'
            };
        }

        const updatedProduct = await Product.findByIdAndUpdate(request.params.id, updateData, { new: true });
        return h.response(updatedProduct).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

// PATCH - Adjust stock balance (+ or -) easily
exports.adjustStock = async (request, h) => {
    try {
        const { action } = request.payload; // expects "increase" or "decrease"
        const product = await Product.findById(request.params.id);

        if (!product) {
            return h.response({ error: 'Produkten hittades inte' }).code(404);
        }

        if (action === 'increase') {
            product.stockQuantity += 1;
        } else if (action === 'decrease') {
            if (product.stockQuantity > 0) {
                product.stockQuantity -= 1;
            } else {
                return h.response({ error: 'Lagersaldot kan inte vara mindre än 0' }).code(400);
            }
        } else {
            return h.response({ error: 'Ogiltig åtgärd. Använd "increase" eller "decrease"' }).code(400);
        }

        await product.save();
        return h.response({ message: 'Lagersaldo uppdaterat', stockQuantity: product.stockQuantity }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};


// DELETE - Remove a product
exports.deleteProduct = async (request, h) => {
     const ProductID = request.params.id;

     try {
         // findByIdAndDelete letar också efter _id automatiskt
         const deletedProduct = await Product.findByIdAndDelete(ProductID);
     
         if (!deletedProduct) {
             return h.response("Product not found").code(404);
         }
         return h.response("Product deleted successfully").code(200);
     } catch (error) {
         return h.response("There was an error: " + error.message).code(500);
     } 
};