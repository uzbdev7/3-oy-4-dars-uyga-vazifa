/* eslint-disable no-undef */
import CustomerModel from "../models/customer.model.js";
import DeliveryStaffModel from "../models/delivery_staff.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateAccestoken, generateRefreshToken } from "../helper/jwt.js";

dotenv.config();

// Valid roles
const validRoles = ["client", "delivery_staff", "admin"];

// --------- REGISTER --------------
export const userRegister = async (req, res, next) => {
    try {
        const { name, fullName, email, phone, password, role } = req.body;

        // Role tekshirish
        const userRole = role || "client";
        if (!validRoles.includes(userRole)) {
            return res.status(400).json({ message: "Invalid role provided" });
        }
        const roleModelMap = {
            client: CustomerModel,
            delivery_staff: DeliveryStaffModel
        };
        const Model = roleModelMap[userRole] || null;

        if (Model) {
            const existingUser = await Model.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already registered" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = null;
        if (Model) {
            newUser = await Model.create({
                name,
                fullName,
                email,
                phone,
                password: hashedPassword,
                role: userRole
            });
        } else {

            newUser = {
                name,
                fullName,
                email,
                phone,
                role: userRole,
                _id: "admin-generated-id" 
            };
        }

        const accessToken = generateAccestoken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        res.status(201).json({
            message: "User registered successfully",
            accessToken,
            refreshToken,
            role: userRole,
            name
        });

    } catch (err) {
        next(err);
    }
};

// ------------- LOGIN --------------
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await CustomerModel.findOne({ email }) || await DeliveryStaffModel.findOne({ email });

        if (!user && email === process.env.ADMIN_EMAIL) {
            user = {
                _id: "admin-id",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: "admin",
                name: "Admin"
            };
        }

        if (!user) return res.status(404).json({ message: "User not found" });
        
        if (user.role === "admin") {
            if (password !== process.env.ADMIN_PASSWORD) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccestoken(user);
        const refreshToken = generateRefreshToken(user);

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

// ---------- GET ALL USERS --------------
export const getAllUsers = async (req, res, next) => {
    try {
        const role = req.query.role; 
        let users;

        if (role === "client") {
            users = await CustomerModel.find();
        } else if (role === "delivery_staff") {
            users = await DeliveryStaffModel.find();
        } else {

            const clients = await CustomerModel.find();
            const deliveryStaff = await DeliveryStaffModel.find();
            users = [...clients, ...deliveryStaff];
        }

        res.status(200).json({ success: true, users });
    } catch (err) {
        next(err);
    }
};

// ------------------------- UPDATE USER -------------------------
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role: requesterRole, userId: requesterId } = req.user; // middleware orqali olinadi
        const { name, fullName, email, phone, password, role } = req.body;


        const roleModelMap = {
            client: CustomerModel,
            delivery_staff: DeliveryStaffModel
        };

        let user;
        for (let key in roleModelMap) {
            user = await roleModelMap[key].findById(id);
            if (user) break;
        }

        if (!user) return res.status(404).json({ message: "User not found" });

        if (requesterRole !== "admin" && requesterId !== id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (name) user.name = name;
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role && requesterRole === "admin" && validRoles.includes(role)) user.role = role;

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });

    } catch (err) {
        next(err);
    }
};

// ------------------------- DELETE USER -------------------------
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role: requesterRole } = req.user;

        if (requesterRole !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const roleModelMap = {
            client: CustomerModel,
            delivery_staff: DeliveryStaffModel
        };

        let deletedUser;
        for (let key in roleModelMap) {
            deletedUser = await roleModelMap[key].findByIdAndDelete(id);
            if (deletedUser) break;
        }

        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully", deletedUser });

    } catch (err) {
        next(err);
    }
};
