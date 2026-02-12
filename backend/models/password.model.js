import {db} from "../config/db.js";

export const getPasswords = async () => {
    try {
        
        const [rows] = await db.query('SELECT * FROM password')
        return rows
        
    } catch (error) {
        console.error('Erreur récupération mdp:', error.message);
        throw error
        
    }
}