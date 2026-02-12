import express from "express";
import { validateLogin, validateRegister } from "../middleware/validation.middleware.js";
import {register, verifyEmail, login} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(`/register`, validateRegister, register);
router.post(`/login`, validateLogin, login);
router.get(`/verify`, verifyEmail);

export default router;