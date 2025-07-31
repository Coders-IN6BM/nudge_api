import { Schema, model } from "mongoose";

const publicationSchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [64, "Title cannot exceed 64 characteres"]
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [true, "Category is required"],
        ref: "Category"
    },
    categoryName:{
        type: String
    },
    publicationContent: {
        type: String,
        required: [true, "Content is required"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, "Owner is required"],
        ref: "User"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    date:{
        type:Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: true,
    },
},

    {
        versionKey: false,
        timeStamps: true
    });

publicationSchema.methods.toJSON = function () {
    const { _v, password, _id, ...publication } = this.toObject()
    publication.uid = _id;
    return publication;
};

export default model("Publication", publicationSchema);