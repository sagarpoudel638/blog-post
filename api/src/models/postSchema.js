import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Post = mongoose.model("post", postSchema);

// create post
export const createPost = async (postObj) => {
  const data = new Post(postObj);

  return await data.save();
};

// get post
export const getPost = async () => {
  const data = await Post.find().populate("author").exec();
  return data;
};
