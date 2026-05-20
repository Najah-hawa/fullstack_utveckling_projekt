const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters"],
        maxlength: [100, "Product name must be at most 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        maxlength: [500, "Beskrivningen är för lång, max 500 tecken"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Priset kan inte vara mindre än 0"]
    },
    image: {
        data: {
            type: Buffer,
            required: [true, "Product image file (binary data) is required"]
        },
        contentType: {
            type: String,
            required: [true, "Image content type is required"] // t.ex. 'image/jpeg' eller 'image/png'
        }
    },
    stockQuantity: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Lagersaldot kan inte vara mindre än 0"],
        default: 0
    },
    size: {
        type: String,
        required: [true, "Product size is required"],
        enum: {
            values: ['xs', 's', 'm', 'L', 'xl', 'xxl'],
            message: "{VALUE} är inte en giltig storlek"
        }
    },
    color: {
        type: String,
        required: [true, "Product color is required"],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Skapar en stark relation till Category-modellen via dess _id
        required: [true, "Product must belong to a category"]
    }
}, {
    // Detta lägger automatiskt till createdAt och updatedAt (Created_Item och Updated_Item)
    timestamps: true 
});


module.exports = mongoose.model('Product', ProductSchema);