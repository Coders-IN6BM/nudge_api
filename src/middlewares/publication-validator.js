import { body , param} from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { uidExist , uidPublicationExist} from "../helpers/db-validators.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerPublicationValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("title").not().isEmpty().withMessage("Title is required"),
    body("category").not().isEmpty().withMessage("Category is required").isMongoId().withMessage("Not a valid MongoDB ID"),
    body("publicationContent").not().isEmpty().withMessage("Content is required"),
    validationsFields,
    catchErrors
];

export const getPublicationByIdValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const deletePublicationsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const updatePublicationsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("uid").isMongoId().withMessage("Not a valid MongoDB ID").custom(uidPublicationExist),
    body("title").optional().notEmpty().withMessage("Title cannot be empty if provided"),
    body("category").optional().isMongoId().withMessage("Not a valid category ID"),
    body("publicationContent").optional().notEmpty().withMessage("Content cannot be empty if provided"),
    validationsFields,
    catchErrors
];
