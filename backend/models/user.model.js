import {db} from "../config/db.js";

// create user

export const createUser = async (
  email,
  passwordHash,
  verifyToken,
  first_name,
  last_name,
  role = "USER" ) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password_hash, verify_token, first_name, last_name, role ) VALUES (?, ? , ? , ?, ?, ? ) ",
    [email, passwordHash, verifyToken, first_name, last_name, role],
  );

  return result.insertId;
};

// login pour trouver un user pas son email et son token

export const findUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

export const findUserByVerifyToken = async (token) => {
    const [rows] = await db.query("SELECT * FROM users WHERE verify_token = ?",[token]);
    return rows[0]
}

export const verifyUser = async (userId) => {
    await db.query(
        "UPDATE users SET is_verified=1, verify_token=NULL WHERE id= ?", [userId])
}