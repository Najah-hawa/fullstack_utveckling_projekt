
const categoryController = require('../controllers/category.controller');
const Joi = require("joi");

module.exports = (server) => {
    server.route([
        {
            method: 'GET',
            path: '/categories',
            handler: categoryController.getCategories
        },
        {
            method: 'GET',
            path: '/categories/{name}',
            handler: categoryController.getCategoryByName
        },
        {
            method: 'POST',
            path: '/categories',
            options: {
                validate: {
                     payload: Joi.object({
                      name: Joi.string().min(3).max(50).required(),
                      description: Joi.string().max(200).optional(),
                      active: Joi.boolean().optional()
                    }),
                    failAction: (request, h, err) => { throw err; }
                },
                handler: categoryController.createCategory
            }
        },
        {
            method: 'PUT',
            path: '/categories/{name}',
            options: {
                validate: {
                    payload: Joi.object({
                      name: Joi.string().min(3).max(50).required(),
                      description: Joi.string().max(200).optional(),
                      active: Joi.boolean().optional()
                    }),
                    failAction: (request, h, err) => { throw err; }
                },
                handler: categoryController.updateCategory
            }
        },
        {
            // Ändra till {id} här för att vara tydlig
            method: 'DELETE',
            path: '/categories/{name}', 
            handler: categoryController.deleteCategory
        }
    ]);
};