import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    verify: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const usersReport = mongoose.model("UsersReport", UserSchema);
export default usersReport;
