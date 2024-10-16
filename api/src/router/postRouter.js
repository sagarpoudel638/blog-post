import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { createPost, getPost } from "../models/postSchema.js";
import { authenticateJwt } from "../middleware/authenticate.js";

const router = express.Router();
const jwtSecret = config.jwtSecret;

router.get("/", async (req, res) => {
  const postData = await getPost();

  const respObj = {
    status: true,
    message: "post fetched",
    data: postData,
  };

  return res.status(200).send(respObj);
});

router.post("/", authenticateJwt, async (req, res) => {
  const { title, content, image } = req.body;
  const { user } = req;

  const postData = await createPost({
    title,
    content,
    image,
    author: user.userid,
  });

  const respObj = {
    status: true,
    message: "Post created",
    data: postData,
  };

  return res.status(200).send(respObj);
});



export default router;
