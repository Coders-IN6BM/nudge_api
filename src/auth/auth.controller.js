import User from "../user/user.model.js";
import { hash, verify } from "argon2";
import { generarJWT } from "../helpers/generate-JWT.js";

export const register = async (req, res) => {
  try {
    const { name, surname, userName, email, password, phone } = req.body;

    const encryptedPassword = await hash(password);

    const user = await User.create({
      name,
      surname,
      userName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phone
    });

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      user: {
        uid: user._id,
        name: user.name,
        surname: user.surname,
        userName: user.userName,
        email: user.email,
        role: user.role
      }
    });
  } catch (e) {
    console.error("Error en registro:", e);
    return res.status(500).json({
      success: false,
      message: "No se pudo registrar el usuario",
      error: e.message
    });
  }
};

export const login = async (req, res) => {
    const { email, userName, password } = req.body;
    
    try {
        // Buscar por email o userName (campo correcto del modelo)
        const user = await User.findOne({ 
            $or: [{ email }, { userName }],
            status: true // Solo usuarios activos
        });
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "Usuario no encontrado" 
            });
        }

        // Verificar contraseña
        const passwordMatch = await verify(user.password, password);
        if (!passwordMatch) {
            return res.status(401).json({ 
                success: false,
                message: "Credenciales inválidas" 
            });
        }

        // Generar token
        const token = await generarJWT(user._id.toString(), user.email);
        
        return res.status(200).json({
            success: true,
            message: "Login exitoso",
            token,
            user: {
                uid: user._id,
                name: user.name,
                surname: user.surname,
                userName: user.userName,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Error en login:", err);
        return res.status(500).json({ 
            success: false,
            message: "Error interno del servidor",
            error: err.message 
        });
    }
};