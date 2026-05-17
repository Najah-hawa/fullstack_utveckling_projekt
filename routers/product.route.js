const productController = require('../controllers/product.controller');
const Joi = require("joi");

module.exports = (server) => {
    server.route([
        { 
            method: 'GET', 
            path: '/products', 
            handler: productController.getProducts 
        },
        { 
            method: 'GET', 
            path: '/products/{id}', 
            handler: productController.getProductById 
        },
        { 
            method: 'POST', 
            path: '/products', 
            options: {
                // 1. Konfiguration för filuppladdning (Multipart)
                payload: {
                    output: 'data',
                    parse: true,
                    multipart: true,
                    allow: 'multipart/form-data',
                    maxBytes: 5242880 // Max 5MB
                },
                // 2. Input-validering med Joi
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).max(100).required(),
                        description: Joi.string().max(500).required(),
                        price: Joi.number().min(0).required(),
                        stockQuantity: Joi.number().integer().min(0).required(),
                        size: Joi.string().valid('xs', 's', 'm', 'L', 'xl', 'xxl').required(),
                        color: Joi.string().required(),
                        category: Joi.string().required(), // Kategori-ID som sträng från Vue
                        image: Joi.any().required()        // Kräver att bildfilen skickas med
                    }),
                    failAction: (request, h, err) => { throw err; }
                },
                handler: productController.createProduct
            }
        },
        { 
            method: 'PUT', 
            path: '/products/{id}', 
            options: {
                payload: {
                    output: 'data',
                    parse: true,
                    multipart: true,
                    allow: 'multipart/form-data',
                    maxBytes: 5242880
                },
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).max(100).optional(),
                        description: Joi.string().max(500).optional(),
                        price: Joi.number().min(0).optional(),
                        stockQuantity: Joi.number().integer().min(0).optional(),
                        size: Joi.string().valid('xs', 's', 'm', 'L', 'xl', 'xxl').optional(),
                        color: Joi.string().optional(),
                        category: Joi.string().optional(),
                        image: Joi.any().optional() // Valfri vid PUT om man inte vill byta bild
                    }),
                    failAction: (request, h, err) => { throw err; }
                },
                handler: productController.updateProduct
            }
        },
        { 
            method: 'PATCH', 
            path: '/products/{id}/stock', 
            options: {
                validate: {
                    payload: Joi.object({
                        // Säkerställer att man BARA kan skicka "increase" eller "decrease"
                        action: Joi.string().valid('increase', 'decrease').required()
                    }),
                    failAction: (request, h, err) => { throw err; }
                },
                handler: productController.adjustStock 
            }
        },
        { 
            method: 'DELETE', 
            path: '/products/{id}', 
            handler: productController.deleteProduct 
        }
    ]);
};