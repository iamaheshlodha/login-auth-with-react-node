import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: Number,
},
  {
    timestamps: true,
  });

const User = mongoose.model("user", userSchema);
export default User;
