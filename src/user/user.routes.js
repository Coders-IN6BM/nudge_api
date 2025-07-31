import { Router } from "express"
import { getUserById, getUsers, updatePassword, updateUser, getCurrentUserProfile } from "./user.controller.js"
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js"
import { validateJWT } from "../middlewares/validate-jwt.js"

const router = Router()

/**
 * @swagger
 * /users/findUser/{uid}:
 *   get:
 *     summary: Obtener usuario por ID (ADMIN)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
    "/findUser/:uid",
    getUserByIdValidator,
    getUserById
);

/**
 * @swagger
 * /users/findUser:
 *   get:
 *     summary: Obtener lista de usuarios (ADMIN)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Límite de usuarios por página
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de usuarios a omitir
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   description: Total de usuarios
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get(
    "/findUser/",
    getUsers
);

/**
 * @swagger
 * /users/updatePassword:
 *   patch:
 *     summary: Actualizar contraseña del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Contraseña actual incorrecta o nueva contraseña igual a la anterior
 *       401:
 *         description: Token inválido o usuario no autenticado
 *       404:
 *         description: Usuario no encontrado
 */
router.patch("/updatePassword", 
    validateJWT,
    updatePasswordValidator, 
    updatePassword
);

/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     summary: Actualizar datos del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario
 *               userName:
 *                 type: string
 *                 description: Nombre de usuario
 *               phone:
 *                 type: string
 *                 description: Número de teléfono
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado exitosamente"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido o usuario no autenticado
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/updateUser", 
    validateJWT,
    updateUserValidator, 
    updateUser
);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido o usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/profile", 
    validateJWT,
    getCurrentUserProfile
);


export default router