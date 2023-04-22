import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "https://cafefcdn.com/thumb_w/650/203337114487263232/2022/4/29/photo1651196701534-1651196701690768521145.jpg",
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    lastname: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
