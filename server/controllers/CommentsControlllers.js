
import PostModel from '../models/postModel.js';
import UserModel from '../models/userModel.js';

export const createComment = async (req, res) => {
    const { postId, userId, comment } = req.body;
    try {
        const user = await UserModel.findById({ _id: userId });
        const dateNow = new Date();
        const newObj = { ...user._doc, comment, dateNow }
        const post = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: newObj } },
            { new: true }
        ).populate('comments');

        return res.status(200).json({ post });
    } catch (error) {
        res.status(400).json("Lỗi không xác định", { error });
    }
}

export const getComment = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const post = await PostModel.findById({ _id: id });
        return res.status(200).json({ comments: post.comments });
    } catch (error) {
        console.log(error);
        return res.status(404).json("Post comments not found");
    }
}

