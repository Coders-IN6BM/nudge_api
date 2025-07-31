import { hash , verify } from "argon2";
import User from "./user.model.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

//Admin
export const getUserById = async (req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

// ADMIN
export const getUsers = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

// All 
export const updatePassword = async (req, res) => {
    try{
        const uid = req.usuario._id; // Obtener del token JWT
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        // Verificar la contraseña actual
        const isCurrentPasswordValid = await verify(user.password, currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Contraseña actual incorrecta"
            });
        }

        // Verificar que la nueva contraseña no sea igual a la actual
        const matchOldAndNewPassword = await verify(user.password, newPassword);
        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true});

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada exitosamente",
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const uid = req.usuario._id; // Obtener del token JWT
        const data = req.body;

        // No permitir actualizar campos sensibles
        const { password, role, status, ...allowedData } = data;

        const user = await User.findByIdAndUpdate(uid, allowedData, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

export const getCurrentUserProfile = async (req, res) => {
    try {
        // Verificar si req.usuario existe
        if (!req.usuario) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado - req.usuario no existe"
            });
        }

        // Verificar si req.usuario tiene _id
        if (!req.usuario._id) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado - req.usuario._id no existe"
            });
        }

        const uid = req.usuario._id; // Obtener del token JWT
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el perfil",
            error: err.message
        });
    }
};