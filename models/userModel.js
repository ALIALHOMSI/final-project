import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: null,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: false,
  },
  otp: {
    type: String,
    default: null,
  },
});

export default mongoose.model("User", userSchema);
