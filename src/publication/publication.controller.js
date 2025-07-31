import Publication from "../publication/publication.model.js";
import User from "../user/user.model.js";

export const registerPublication = async (req, res) => {
    try {
        const data = req.body;
        const publication = await Publication.create(data);

        await User.findByIdAndUpdate(data.owner, { $push: { publications: publication._id } }, { new: true });

        return res.status(201).json({
            message: "Publication has been created",
            publication
        });
    } catch (error) {
        return res.status(500).json({
            message: "Publication creation failed",
            error: error.message
        });
    }
};


export const getPublicationById = async (req, res) => {
    try {
        const { uid } = req.params;

        const publication = await Publication.findById(uid)
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'nickname'
                }
            })
            .populate('category', 'name');

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            publication
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicación",
            error: err.message
        });
    }
};


export const getPublication = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, publication ] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            publication
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        })
    }
}

export const deletePublication = async (req, res) => {
    try {
        const { uid } = req.params;
        const { uidOwner } = req.body; 

        const publication = await Publication.findById(uid);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found" 
            });
        }

        if (uidOwner !== publication.owner.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this publication"
            });
        }

        await Publication.findByIdAndUpdate(uid, { status: false });
        await User.findByIdAndUpdate(publication.owner, { $pull: { publications: uid } });

        return res.status(200).json({ 
            success: true,
            message: "Publication deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting publication:", error);
        return res.status(500).json({
            success: false,
            message: "Delete publication failed",
            error: error.message
        });
    }
};


export const updatePublication = async (req, res) => {
    try {
        const { uid } = req.params;
        const { uidOwner, title, category, publicationContent } = req.body;

        const publication = await Publication.findById(uid);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        if (uidOwner !== publication.owner.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this publication"
            });
        }

        const updatedPublication = await Publication.findByIdAndUpdate(uid,{ title, category, publicationContent },{ new: true });

        return res.status(200).json({
            success: true,
            message: "Publication updated successfully",
            publication: updatedPublication,
        });

    } catch (err) {
        console.error("Error updating publication:", err);
        return res.status(500).json({
            success: false,
            message: "Error updating publication",
            error: err.message
        });
    }
};
