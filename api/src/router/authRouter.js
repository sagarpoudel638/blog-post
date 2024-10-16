import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createUser, findUser } from "../models/userSchema.js";
import { config } from "../config/config.js";
const router = express.Router();
const JWT_SECRET = config.jwtSecret;

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log("Request body:", req.body); // Add this line
    const { username, email, password } = req.body;
    console.log("Password received:", password);
    const hashedpassword = await bcrypt.hash(password, salt);

    const data = await createUser({
      username,
      email,
      password: hashedpassword,
    });

    const respObj = {
      status: true,
      message: "User Created",
      data,
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: false,
      message: err.message || "Error Creating User",
    };

    return res.status(500).send(errObj);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userData = await findUser({
    email,
  });

  if (userData) {
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      const errObj = {
        status: false,
        message: "invalid email or password",
      };

      return res.status(401).send(errObj);
    }

    const token = jwt.sign(
      {
        userid: userData._id,
        email: userData.email,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const respObj = {
      status: true,
      message: "login successful",
      data: {
        token,
      },
    };

    return res.status(200).send(respObj);
  } else {
    console.log("error in auth");
  }
});

export default router;
