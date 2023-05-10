import userReport from "../models/userReport.js";
import UserModel from "../models/userModel.js";

export const createUserReport = async (req, res) => {
    const userId = req.params.id;
    console.log("userId", userId)
    try {
        const newPostReport = await userReport.create({
            _id: userId,
            verify: false
        });
        res.status(200).json(newPostReport);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
export const listUserReport = async (req, res) => {
    try {
        const listID = await userReport.find();
        const ids = listID.map((item) => {
            const { _id } = item._doc;
            return _id;
        });
        const kq = await Promise.all(
            ids.map(async (id) => {
                return await UserModel.findById(id);
            })
        );
        console.log("kq", kq);
        res.status(200).json(kq);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


export const deleteUserReport = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await userReport.findById(id);
        await post.deleteOne();
        return res.status(200).json("Post deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};
