import mysql from "mysql2/promise"

import "dotenv/config"

let db 

try {
    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    await db.getConnection()
    console.log(`db connexion`, process.env.DB_NAME);
    
} catch (error) {
    console.log(`erreur lors de la connexion a la db`, error.message);
    
}

export {db}