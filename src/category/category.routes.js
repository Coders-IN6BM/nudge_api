import { Router } from "express";
import { createCategory, getCategories } from "./category.controller.js";
import { createCategoryValidator, getCategoriesValidator } from "../middlewares/category-validators.js";

const router = Router();

// Crear categoría - Solo ADMIN
router.post(
    "/create",
    createCategoryValidator,
    createCategory
);

// Obtener categorías - Público (sin autenticación)
router.get(
    "/",
    getCategoriesValidator,
    getCategories
);

export default router;
