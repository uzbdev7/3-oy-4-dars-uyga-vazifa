/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';
import { OtpModel } from '../models/otp.model.js';
import { generateAccestoken, generateRefreshToken } from '../helper/jwt.js';
import otpGenerator from 'otp-generator';
import { sendVerificationCode } from '../services/email.service.js';

export const signUp = async (req, res, next) => {
    try {
        const { name, secondName, email, phone, password, role } = req.body;

        const userExist = await UserModel.findOne({ email });

        if (userExist)
            return res
                .status(400)
                .json({ message: "Email oldin ro'yhatdan o'tgan" });

        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await UserModel.create({
            name,
            secondName,
            phone,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role,
        });

const otp = otpGenerator.generate(6, {
    digits: true, 
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false, 
    specialChars: false    
});

console.log(otp); 

        await OtpModel.create({
            user_id: newUser._id,
            otp,
        });

        await sendVerificationCode(email, otp);        

        res.status(201).json({
            message: 'Foydalanuvchi yaratildi. OTP emailingizga yuborildi.',
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email.toLowerCase() });
        console.log(user);

        if (!user) return res.status(404).json({ message: 'User topilmadi' });

        if (!user.isActive)
            return res
                .status(403)
                .json({
                    message: 'Akkaunt aktiv emas. Iltimos, OTP tasdiqlang.',
                });

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ message: "Parol noto'g'ri." });

        const accessToken = generateAccestoken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();
        console.log(user)

        res.status(200).json({
            message: 'Tizimga muvaffaqiyatli kirildi',
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            },
        });
    } catch (error) {
        next(error);
    }
};

// const decoded = verifyToken(token,process.env.JWT_ACCESS_SECRET)
// console.log(decoded)

export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await UserModel.findById(userId).select(
            '-password -refreshToken'
        );

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'Foydalanuvchi topilmadi' });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found.' });

        const otpInfo = await OtpModel.findOne({ otp, user_id: user._id });

        if (!otpInfo)
            return res.status(400).json({ message: 'Invalid or expired OTP.' });

        user.isActive = true;
        await user.save();

        await OtpModel.findByIdAndDelete(otpInfo._id);

        return res
            .status(200)
            .json({ success: true, message: 'OTP verified successfully.' });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error); 
    }
}

