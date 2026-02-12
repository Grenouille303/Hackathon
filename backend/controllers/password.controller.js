import * as model from "../models/password.model.js";

export const getPasswords = async (req,res) => {
    try {
        const passwords = await model.getPasswords()
        res.json(passwords)

    } catch (error) {
        console.error('Erreur recupération mdp:',error.message);
        res.status(500).json({message:'Erreur serveur lors de la recuperation des mdp'})
        
    }
}