import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  NODE_ENV: process.env.NODE_ENV,
  CLUDINARY_NAME: process.env.CLUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};