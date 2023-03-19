import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating a post

export const createPost = async (req, res) => {
  const newPost = await new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get list post by user
export const getListPostUser = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.find({ "userId": id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getListPost = async (req, res) => {

  try {
    const post = await PostModel.find()
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    PostModel.findOneAndUpdate(
      { _id: postId },
      { title: req.body.title, desc: req.body.desc },
      { new: true },
      (err, updatedPost) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.log(updatedPost);
          res.status(200).send("Post Updated Successfully");
        }
      })
  } catch (error) {
    cosole.log(error)
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    // if (post.userId === userId) {
    await post.deleteOne();
    console.log("Post deleted");
    //   res.status(200).json("Post deleted.");
    // } else {
    //   res.status(403).json("Action forbidden");
    //   console.log("Action forbidden")
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const { userId, postId } = req.body;
  console.log("like", userId);
  try {
    const post = await PostModel.findById(postId);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json(post);
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


export const searchPosts = async (req, res) => {
  const keyword = req.params.id;

  if (keyword == "all") {
    const posts = await PostModel.find();
    return res.status(200).json(posts);
  }
  try {
    const posts = await PostModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

