import { Router } from 'express';
import { 
    userLogin, 
    userRegister, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} from '../controller/auth.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../validations/validation.js';
import { registerSchema, loginSchema } from '../validations/user.validation.js';
import { roleGuard } from '../middleware/roleGuard.js'; 

const router = Router();

// -------- REGISTER --------
router.post('/register', validate(registerSchema, 'body'),roleGuard(['admin']),userRegister);

// --------- LOGIN ----------
router.post('/login', validate(loginSchema, 'body'), userLogin);

// --------- PROFILE --------------
router.get('/profile', authGuard, (req, res) => {
        res.status(200).json({
            message: "User profile",
            user: req.user
        });
    }
);

// ------------- GET ALL USERS -----------
router.get('/users', authGuard,roleGuard(['admin']), getAllUsers);

// ------------------------- UPDATE USER -------------------------
router.put('/users/:id', authGuard, updateUser  );

// ------------------------- DELETE USER -------------------------
router.delete('/users/:id', authGuard,roleGuard(['admin']),deleteUser);

export default router;
