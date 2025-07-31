import { body , param } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { uidCommentExist, uidExist } from "../helpers/db-validators.js";

export const addCommentValidator = [
    body("content").not().isEmpty().withMessage("userName is required"),
    body("publication").not().isEmpty().withMessage("Email is required").isMongoId().withMessage("No es un Id válido"),
    validationsFields,
    catchErrors
];

export const getCommentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(uidExist),
    validationsFields,
    catchErrors
];

export const deleteCommentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidCommentExist),
    validationsFields,
    catchErrors
];

export const updateCommentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidCommentExist),
    validationsFields,
    catchErrors
];
