import User from "../user/user.model.js";
import Publication from "../publication/publication.model.js";
import Comment from "../comments/comment.model.js";

export const emailExists = async (email = "") => {
    if (!email || email.trim() === "") {
        throw new Error("El email es requerido para la validación");
    }
    
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`El email ${email} ya está registrado`);
    }
};

export const usernameExists = async (username = "") => {
    if (!username || username.trim() === "") {
        throw new Error("El nombre de usuario es requerido para la validación");
    }
    
    const existe = await User.findOne({ userName: username });
    if (existe) {
        throw new Error(`El nombre de usuario ${username} ya está registrado`);
    }
};

export const phoneExists = async (phone = "") => {
    if (!phone || phone.trim() === "") {
        throw new Error("El teléfono es requerido para la validación");
    }
    
    const user = await User.findOne({ phone }); 
    if (user) {
        throw new Error(`El teléfono ${phone} ya está registrado`);
    }
};

export const uidExist = async (uid = "") => {
    if (!uid || uid.trim() === "") {
        throw new Error("El ID es requerido para la validación");
    }
    
    const user = await User.findById(uid);
    if (!user) {
        throw new Error(`No existe un usuario con el ID ${uid}`);
    }
};

export const uidPublicationExist = async (uid = "") => {
    if (!uid || uid.trim() === "") {
        throw new Error("El ID de publicación es requerido para la validación");
    }
    
    const publication = await Publication.findById(uid);
    if (!publication) {
        throw new Error(`No existe una publicación con el ID ${uid}`);
    }
};

export const uidCommentExist = async (uid = "") => {
    if (!uid || uid.trim() === "") {
        throw new Error("El ID de comentario es requerido para la validación");
    }
    
    const comment = await Comment.findById(uid);
    if (!comment) {
        throw new Error(`No existe un comentario con el ID ${uid}`);
    }
};

