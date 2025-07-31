import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJWT = async (req, res, next) => {
    try{
        console.log('=== DEBUG validateJWT ===');
        console.log('req.headers:', req.headers);
        console.log('req.body:', req.body);
        console.log('req.query:', req.query);

        let token = (req.body && req.body.token) || 
                   (req.query && req.query.token) || 
                   req.headers["authorization"] || 
                   req.headers["Authorization"]
        
        console.log('Token extraído:', token);

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No existe token en la petición"
            })
        }

        // Remover 'Bearer ' si existe
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }

        console.log('Token después de procesar:', token);

        const decoded = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY)
        console.log('Token decodificado:', decoded);

        const user = await User.findById(decoded.uid)
        console.log('Usuario encontrado:', user ? 'Sí' : 'No');

        if(!user){
           return res.status(401).json({
                success: false,
                message: "Usuario no existe en la DB"
           }) 
        }

        if(user.status === false){
            return res.status(401).json({
                success: false,
                message: "Usuario desactivado previamente"
            })
        }

        req.usuario = user
        console.log('req.usuario establecido correctamente');
        next()
    }catch(err){
        console.error('Error en validateJWT:', err);
        return res.status(500).json({
            success: false,
            message : "Error al validar el token",
            error: err.message
        })
    }
}