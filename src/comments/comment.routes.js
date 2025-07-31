import { Router } from "express"
import { addComment, getUserComments, deleteComment, updateComment } from "./comment.controller.js"
import { addCommentValidator , getCommentValidator, deleteCommentValidator, updateCommentValidator} from "../middlewares/comment-validator.js"

const router = Router()

router.post(
    "/addComment",
    addCommentValidator,
    addComment
);

router.get(
    "/getComment/:uid",
    getCommentValidator,
    getUserComments 
);

router.patch(
    "/deleteComment/:uid",
    deleteCommentValidator,
    deleteComment
);

router.patch(
    "/updateComment/:uid",
    updateCommentValidator,
    updateComment
);

export default router