import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    userId: { type: String, required: true },
    desc: { type: String, required: true },
    likes: [],
    comments: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
postSchema.index({ title: "text", desc: "text" });
var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
