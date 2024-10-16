// import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/config/dbConfig.js";

// get config file
import { config } from "./src/config/config.js";

import authRouter from "./src/router/authRouter.js";
import userRouter from "./src/router/userRouter.js";
import postRouter from "./src/router/postRouter.js";

// dotenv.config();
const app = express();
const PORT = config.port;

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("BLOG APIs");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(PORT, (error) => {
  error
    ? console.log("ERROR starting API server")
    : console.log("http://localhost:" + PORT + " started");
});
