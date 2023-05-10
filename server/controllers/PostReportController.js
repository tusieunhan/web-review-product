import postReport from "../models/postReport.js";
import PostModel from "../models/postModel.js";


export const createPostsReport = async (req, res) => {
    const postId = req.params.id;
    console.log("postId", postId)
    try {
        const newPostReport = await postReport.create({
            _id: postId,
            verify: false
        });
        res.status(200).json(newPostReport);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
export const listPostsReport = async (req, res) => {
    try {
        const listID = await postReport.find();
        const ids = listID.map((item) => {
            const { _id } = item._doc;
            return _id;
        });
        const kq = await Promise.all(
            ids.map(async (id) => {
                return await PostModel.findById(id);
            })
        );
        console.log("kq", kq);
        res.status(200).json(kq);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


export const deletePostReport = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postReport.findById(id);
        await post.deleteOne();
        return res.status(200).json("Post deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};
