import "dotenv/config";

export const config = {
  port: process.env.PORT || "3000",
  mongodb: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/blog-db",
  },
  jwtSecret: "secret",
};
