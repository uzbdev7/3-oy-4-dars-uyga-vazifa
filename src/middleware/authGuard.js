/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
import { verifyToken } from "../helper/jwt.js";

dotenv.config();

export const authGuard = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token mavjud emas" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Token noto'g'ri yoki muddati o'tgan" });
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Foydalanuvchi topilmadi" });
    }

    req.user = user;
    next(); 
  } catch (err) {
    console.error("Auth guard error:", err);
    res.status(500).json({ message: "Server xatosi" });
  }
};
