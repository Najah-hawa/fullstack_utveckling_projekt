const authController = require('../controllers/auth.controller');
const Joi = require('joi');

module.exports = (server) => {
    server.route([
        {
            method: 'POST',
            path: '/auth/register',
            options: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(2).max(50).required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().min(6).required()
                    }),
                    failAction: (request, h, err) => { throw err; }
                }
            },
            handler: authController.register
        },
        {
            method: 'POST',
            path: '/auth/login',
            options: {
                validate: {
                    payload: Joi.object({
                        // bara email och lösenord krävs vid inloggning:
                        email: Joi.string().email().required(),
                        password: Joi.string().required()
                    }),
                    failAction: (request, h, err) => { throw err; }
                }
            },
            handler: authController.login
        }
    ]);
};