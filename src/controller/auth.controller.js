import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userRegister = async (req, res, next) => {
    try {
        const { name, fullName, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            fullName,
            email,
            password: hashedPassword,
            role: role || "client"
        });

        const accessToken = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.ACCESS_EXPIRES }
        );

        const refreshToken = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.REFRESH_EXPIRES }
        );

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            accessToken,
            refreshToken,
            role: newUser.role,
            name: newUser.name
        });

    } catch (err) {
        next(err);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.ACCESS_EXPIRES }
        );

        const refreshToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.REFRESH_EXPIRES }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            role: user.role,
            name: user.name
        });

    } catch (err) {
        next(err);
    }
};
