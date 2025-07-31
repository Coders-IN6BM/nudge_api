import Category from "./category.model.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        const category = await Category.create({
            name,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Categoría creada exitosamente",
            category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la categoría",
            error: error.message
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: true });

        return res.status(200).json({
            success: true,
            total: categories.length,
            categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorías",
            error: error.message
        });
    }
};
