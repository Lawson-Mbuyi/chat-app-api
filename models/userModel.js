import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
