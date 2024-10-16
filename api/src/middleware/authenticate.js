import jwt from "jsonwebtoken";

import { config } from "../config/config.js";

export const authenticateJwt = (req, res, next) => {
  try {
    const jwtSecret = config.jwtSecret;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).send("Unauthorized");
    } else {
      const decoded = jwt.verify(token, jwtSecret);

      console.log(decoded);

      req.user = decoded;

      next();
    }
  } catch (err) {
    console.log(err);
    const errObj = {
      status: false,
      message: "Error validating token",
    };
    return res.status(500).send(errObj);
  }
};
