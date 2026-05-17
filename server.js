'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        // Ändra host till 0.0.0.0 i produktion så att servern är nåbar externt
        port: process.env.PORT || 3000,
        host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
        routes: {
            cors: {
                origin: ['*'] 
            }
        }
    });

    // Connecting to MongoDB
    try {
        // Tips: Se till att du har MONGODB_URI i din .env-fil
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE);
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }

    // Server routes
    require("./routers/category.route")(server);
    require("./routers/product.route")(server); 
   
    await server.start();
    console.log('🚀 Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log('💥 Unhandled Rejection:', err);
    process.exit(1);
});

init();