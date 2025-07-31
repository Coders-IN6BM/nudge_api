import { Router } from "express"
import { getUserById, getUsers, updatePassword, updateUser, } from "./user.controller.js"
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js"
import { validateJWT } from "../middlewares/validate-jwt.js"

const router = Router()

router.get(
    "/findUser/:uid",
    getUserByIdValidator,
    getUserById
);

router.get(
    "/findUser/",
    getUsers
);

router.patch("/updatePassword", 
    validateJWT,
    updatePasswordValidator, 
    updatePassword
);

router.put("/updateUser", 
    validateJWT,
    updateUserValidator, 
    updateUser
);


export default router