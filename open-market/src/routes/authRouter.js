import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js'
import loginSchema from '../schemas/loginSchema.js'
import registerSchema from '../schemas/registerSchema.js'

const authRouter = Router();
authRouter.post('/register', validateSchemaMiddleware(registerSchema), register);
authRouter.post('/login', validateSchemaMiddleware(loginSchema), login);
export default authRouter;