const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photo: {
    type: String
  },
  data: {
    type: Array,
    default: []
  },
  public_id: {
    type: String
  },
  likecount: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array,
  }
});

let Post = mongoose.model("Post", postSchema);

module.exports = { Post };
