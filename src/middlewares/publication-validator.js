import { body , param} from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { uidExist , uidPublicationExist} from "../helpers/db-validators.js";


export const registerPublicationValidator = [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("category").not().isEmpty().withMessage("Category is required").isMongoId().withMessage("Not a valid MongoDB ID"),
    body("publicationContent").not().isEmpty().withMessage("Content is required"),
    body("owner").isMongoId().withMessage("Invalid ID").custom(uidExist),
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
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const updatePublicationsValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];
