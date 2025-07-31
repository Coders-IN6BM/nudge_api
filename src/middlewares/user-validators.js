import { body , param } from "express-validator";
import { emailExists, usernameExists , uidExist } from "../helpers/db-validators.js";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("userName").not().isEmpty().withMessage("userName is required").custom(usernameExists),
    body("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must be more strong"),
    validationsFields,
    catchErrors
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("userName").optional(),
    body("password").notEmpty().withMessage("The password need have 8 characteres"),
    validationsFields,
    catchErrors
];
export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(uidExist),
    validationsFields,
    catchErrors
];

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID").custom(uidExist),
    validationsFields,
    catchErrors
];

export const updatePasswordValidator = [
    body("currentPassword").notEmpty().withMessage("La contraseña actual es requerida"),
    body("newPassword").isLength({min: 8}).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La nueva contraseña debe contener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo"),
    validationsFields,
    catchErrors
];

export const updateUserValidator = [
    body("name").optional().isLength({min: 2}).withMessage("El nombre debe tener al menos 2 caracteres"),
    body("surname").optional().isLength({min: 2}).withMessage("El apellido debe tener al menos 2 caracteres"),
    body("email").optional().isEmail().withMessage("Email inválido"),
    body("userName").optional().isLength({min: 3}).withMessage("El username debe tener al menos 3 caracteres"),
    body("password").not().exists().withMessage("No se puede actualizar la contraseña por esta ruta"),
    body("role").not().exists().withMessage("No se puede actualizar el rol por esta ruta"),
    body("status").not().exists().withMessage("No se puede actualizar el status por esta ruta"),
    validationsFields,
    catchErrors
];
