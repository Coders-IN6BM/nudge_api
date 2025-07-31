import jwt from "jsonwebtoken";

export const generarJWT = (uid = '', email = '') => {
    return new Promise((resolve, reject) => {
        // Validación básica de parámetros
        if (!uid || !email) {
            return reject('UID y email son requeridos para generar el token');
        }

        const payload = { uid, email };
        
        jwt.sign(
            payload,
            process.env.SECRET_OR_PRIVATE_KEY,
            {
                expiresIn: '8h'
            },
            (err, token) => {
                if (err) {
                    console.error('Error generando JWT:', err);
                    reject('Error al generar el token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};