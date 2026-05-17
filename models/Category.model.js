const mongoose = require('mongoose');

//hämta aktuell år
const currentYear = new Date().getFullYear();

const CategorySchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true, // Förhindrar dubbletter av samma kategori
        trim: true,   // Tar bort onödiga mellanslag i början/slutet
        minlength: [3, "Category name must be at least 3 characters"],
        maxlength: [80, "Category name must be at most 80 characters"]
        },
    description: {
        type: String,
        maxlength: [200, "Description is to long"],
        default: ""
    },
    active: {
        type: Boolean,
        default: true // Bra om du vill "dölja" en kategori utan att radera den helt
    }
}, { 
    // Detta lägger automatiskt till createdAt och updatedAt
    timestamps: true 
}
);

const Category =mongoose.model("Category", CategorySchema);
module.exports = Category;
