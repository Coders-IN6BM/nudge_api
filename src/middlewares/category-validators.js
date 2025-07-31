import { body } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

// Validador para crear categorías (solo ADMIN)
export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .trim(),
    body("description")
        .optional()
        .isLength({ max: 200 })
        .withMessage("La descripción no puede exceder 200 caracteres")
        .trim(),
    validationsFields,
    catchErrors
];

// Validador para obtener categorías (público - sin autenticación)
export const getCategoriesValidator = [
    catchErrors
];
