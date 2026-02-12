import express from 'express';
import { getPasswords } from '../controllers/password.controller.js';

const router = express.Router();

router.get('/',getPasswords)

export default router