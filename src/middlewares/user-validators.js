import { body , param } from "express-validator";
import { emailExist, userNameExist , uidExist } from "../helpers/db-validators.js";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("userName").not().isEmpty().withMessage("userName is required").custom(userNameExist),
    body("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").custom(emailExist),
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
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID").custom(uidExist),
    body("newPassword").isLength({min: 8}).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must contain at least 8 characters"),
    validationsFields,
    catchErrors
];

export const updateUserValidator = [
    param("uid", "Not a valid ID").isMongoId().custom(uidExist),
    validationsFields,
    catchErrors
];
