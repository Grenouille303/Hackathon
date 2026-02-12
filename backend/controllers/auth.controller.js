import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {v4 as uuid4} from "uuid";
import "dotenv/config";
import {db} from "../config/db.js";
import {createUser, findUserByEmail,findUserByVerifyToken,verifyUser} from "../models/user.model.js"
import { sendVeerificationMail } from "../config/mailer.js";


// creation compte 


export const register = async (req, res) => {
    try {
        const {email, password} = req.body;

        console.log('register',req.body);
        
        const existing = await findUserByEmail(email);
        if (existing)
            return res.status(400).json({message:`Email deja utilisé`});
        const passwordHash = await argon2.hash(password);
        const verifyToken = uuid4();

        await createUser(email, passwordHash, verifyToken)

        await sendVeerificationMail(email, verifyToken);

        res.status(201).son({message:`Compte crée veuillez vérifier votre mail`})
        
    } catch (error) {
        res.status(500).json({message:`erreur serveur`, error:error.message})
    }
};

// verification email

export const verifyEmail = async (req, res) => {
    try {
        const {token} = req.query;
        const user = await findUserByVerifyToken(token);
        if(!user)
            return res.status(400).json({message:`Tooken invalide`});
        await verifyUser(user.id); 
        res.status(200).json({message:`Votre compte a bien été vérifié`})
    } catch (error) {
        res.status(500).json({message:`Erreur serveur`, error:error.message})
    }
};

// login

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await findUserByEmail(email) 
        if(!user) {
            return res.status(400).json({message:`Email ou mdp incorrect`})
        };

        if(!user.is_verified) {
            return res.status(403).json({message: `Compte non vérifié`})
        };

        const valid = await argon2.verify(user.password_hash, password);
        if(!valid) { 
            return res.status(400).json({message:` Email ou mdp incorrect`})
        }

        const token = jwt.sign(
            { id: user.id, email: user.mail, role:user.role},
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN}
        )
        
        return res.status(200).json({token})



    } catch (error) {
        return res.status(500).json({message:`Erreur serveur`,error:error.message})
        
    }
}