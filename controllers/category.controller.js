const Category = require("../models/Category.model.js");
const Joi = require("joi");

// GET - Hämta alla kategorier
exports.getCategories = async (request, h) => {
    try {
        const categories = await Category.find();
        return h.response(categories).code(200);
    } catch (err) {
        return h.response(err).code(500);
    }
};

exports.getCategoryByName = async (request, h) => {
        const CategorieName = request.params.name;

            try {
            const category = await Category.findOne({ name: CategorieName });

            if (!category) {
                return h.response("Category not found").code(404);
              }
 
               return category; // skickar tillbaka produkten som JSON
           } catch (error) {
               return h.response("There was an error: " + error).code(500);
           }
        }

// POST - Skapa en ny kategori
exports.createCategory = async (request, h) => {
    try {
                const category = new Category(request.payload);
                return await category.save();
            }catch(error){
                return h.response("There was an error" + error).code(500);
            }
};

// PUT - Uppdatera en kategori
exports.updateCategory = async (request, h) => {
    const categoryName = request.params.name; //sparar värdet vi fått från url 
        const updateData = request.payload; // det vi vill uppdatera

        try {
            const updatedCategory = await Category.findOneAndUpdate(
                { name: categoryName },   // hitta produkten
                updateData,              // uppdatera med nya värden
                { new: true }            // returnera den uppdaterade produkten
            );

            if (!updatedCategory) {
                return h.response("Category not found").code(404);
            }

            return updatedCategory;
        } catch (error) {
            return h.response("There was an error: " + error).code(500);
        }
};

// DELETE - Ta bort en kategori
exports.deleteCategory = async (request, h) => {
   const categoryName = request.params.name;

        try {
            const deletedCategory = await Category.findOneAndDelete({ name: categoryName });

            if (!deletedCategory) {
                return h.response("Category not found").code(404);
            }
            return h.response("Category deleted successfully").code(200);
        } catch (error) {
            return h.response("There was an error: " + error).code(500);
        }
};