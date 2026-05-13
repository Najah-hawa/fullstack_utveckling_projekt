'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: { cors: true } //  viktigt för att connect till vue sedan. 
    });

    //  connecting to MongoDB
    try {
        await mongoose.connect(process.env.DATABASE || process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }

    //Routes 
    
    await server.start();
    console.log('🚀 Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();