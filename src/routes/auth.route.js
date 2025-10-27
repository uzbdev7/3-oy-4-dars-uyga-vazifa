import { Router } from 'express';
import { userLogin, userRegister } from '../controller/auth.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../validations/validation.js';
import { registerSchema, loginSchema } from '../validations/user.validation.js';

const router = Router();

router.post('/register', validate(registerSchema, 'body'), userRegister);

router.post('/login', validate(loginSchema, 'body'), userLogin);

router.get('/profile', authGuard, (req, res) => {
    res.status(200).json({
        message: "User profile",
        user: req.user
    });
});

export default router;
