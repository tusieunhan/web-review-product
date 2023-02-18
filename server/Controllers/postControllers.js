const { Post } = require("../Model/postModel");
const { cloudinary } = require("../Config/cloudinary");
const { User } = require("../Model/userModel");

const postControllers = {
  upload: async (req, res) => {
    try {
      const files = req.files;
      const uploadfile = async (files) => {
        const urls = [];
        for (const file of files) {
          const { path, mimetype } = file;
          const newPath = await cloudinary.uploader.upload(path, {
            resource_type: mimetype.split("/")[0],
          });
          let { url, public_id, resource_type } = newPath;
          urls.push({ url, public_id, resource_type });
        }
        return urls;
      };
      const datapost = await uploadfile(files);
      const newpost = await new Post({
        data: datapost,
        photo: req.body.photo,
        user: req.body.idUser,
      });
      await User.findOneAndUpdate(
        { _id: req.body.idUser },
        { $push: { posts: newpost._id } }
      );
      res.json(newpost);
    } catch (error) {
      res.status(500).json("Can not login account");
    }
  },
};

module.exports = postControllers;
