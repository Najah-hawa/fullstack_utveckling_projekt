const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, 
    stockQuantity: { type: Number, required: true, default: 0 },
    size: { type: String, enum: ['xs', 's', 'm', 'L', 'xl', 'xxl'], required: true },
    color: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { 
    timestamps: true //  Created_Item و Updated_Item blir utomatiskt hanterade av Mongoose, så vi behöver inte lägga till dem manuellt i schemat.
});

module.exports = mongoose.model('Product', productSchema);