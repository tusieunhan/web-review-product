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

const postReport = mongoose.model("PortsReport", UserSchema);
export default postReport;
