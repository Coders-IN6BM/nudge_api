import Comment from "../comment/comment.model.js"
import User from "../user/user.model.js"
import Publication from "../publication/publication.model.js"

export const addComment = async(req,res) =>{
    try{
        const data = req.body
        data.date = new Date();
        const comment = await Comment.create(data)

        await User.findByIdAndUpdate(data.author, {$push: {comments: comment._id}}, {new: true})
        await Publication.findByIdAndUpdate(data.publication, {$push: {comments: comment._id}}, {new: true})

        return res.status(201).json({
            message: "Comment has been publicated",
            comment
        })
    }catch(error){
        return res.status(500).json({
            message: "Publication of comment has failed",
            error: error.message
        })
    }
}

export const getUserComments = async (req, res) => {
    try {
        const { uid } = req.params;
        const { desde = 0, limite = 10 } = req.query; 

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const query = { author: uid, status: true };

        const [total, comments] = await Promise.all([
            Comment.countDocuments(query),
            Comment.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            comments
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: " An error occurred while fetching user comments",
            error: err.message
        });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { uid } = req.params;
        const { uidAuthor } = req.body;

        const comment = await Comment.findById(uid);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (uidAuthor !== comment.author.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

        await Comment.findByIdAndUpdate(uid, { status: false });

        await Publication.findByIdAndUpdate(comment.publication, { $pull: { comments: uid } });
        await User.findByIdAndUpdate(comment.author, { $pull: { comments: uid } });

        return res.status(200).json({ 
            success: true,
            message: "Comment deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message
        });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { uid } = req.params;
        const { content, uidAuthor } = req.body;

        const comment = await Comment.findById(uid);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (uidAuthor !== comment.author.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this comment"
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(uid, { content }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment: updatedComment,
        });

    } catch (err) {
        console.error("Error updating comment:", err);
        return res.status(500).json({
            success: false,
            message: "Error updating comment",
            error: err.message
        });
    }
};
