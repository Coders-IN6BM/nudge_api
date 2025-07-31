import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        maxLength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        maxLength: [200, "Description cannot exceed 200 characters"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

categorySchema.methods.toJSON = function () {
    const { _v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
};

export default model("Category", categorySchema);
