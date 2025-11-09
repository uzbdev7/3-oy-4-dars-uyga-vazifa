import { Router } from 'express';
import { signIn, signUp, getProfile, verifyOtp, getAll } from '../controller/auth.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../validations/validation.js';
import { registerSchema, loginSchema } from '../validations/user.validation.js';


const router = Router();

// -------- REGISTER --------
router.post('/register', validate(registerSchema, 'body'), signUp);

// --------- LOGIN ----------
router.post('/login', validate(loginSchema, 'body'), signIn);

// --------- PROFILE --------------
router.get('/profile', authGuard, getProfile);

// ------------- VERIFY ----------------
router.post('/verify',verifyOtp)

// ---------------GETALL------------
router.get('/getAll', authGuard, getAll);

export default router;
