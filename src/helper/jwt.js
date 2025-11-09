/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

// CREATE ACCESS TOKEN
export const generateAccestoken = (user) => {
    return jwt.sign({ id: user._id.toString() }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });
};

// CREATE REFRESH TOKEN
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
  });
};

// VERIFY TOKEN
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("JWT verify error:", err);
    return null; 
  }
};