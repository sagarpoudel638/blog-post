import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: "" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt:{type:Date,
    default:Date.now(),
  }
});

export const Post = mongoose.model("post", postSchema);
