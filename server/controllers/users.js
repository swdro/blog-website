import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db.js';

dotenv.config({ path: '../.env' });
const expiration = 604800;

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // query email
        const queryResult = await pool.query(
            "SELECT * FROM accounts AS acc WHERE acc.email = $1",
            [email]
        );
        const isPasswordCorrect = await bcrypt.compare(password, queryResult.rows[0].password);
        if (!queryResult.rowCount) {
            return res.status(404).json({ message: "User does not exist" });
        } else if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid Email/Password" });
        }
        // gather data from query
        const result = {
            id: queryResult.rows[0].id,
            firstName: queryResult.rows[0].firstname,
            lastName: queryResult.rows[0].lastname,
            email: queryResult.rows[0].email,
            dateCreated: queryResult.rows[0].datecreated,
            profilePicture: queryResult.rows[0].profilepicture,
            adminRole: queryResult.rows[0].adminrole
        }
        const token = jwt.sign({ 
            email: result.email, 
            id: result.id }, 
            process.env.JWTSECRET, 
            { expiresIn: expiration });
        // send response
        res.status(200).json({ result, token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong while signing in" });
    }
}

export const signup = async (req, res) => {
    // extract requense information
    const { firstName, lastName, email, password, confirmedPassword } = req.body;
    try {
        // check if passwords match then hashes it
        if (password !== confirmedPassword) return res.status(400).json({ message: "Passwords don't match." });
        if (password.length < 8 || password.length > 15) return res.status(400).json({ message: "Password must be between 8 and 15 characters" });  
        const hashedPassword = await bcrypt.hash(password, 12);
        // query database
        const queryResult = await pool.query(
            "INSERT INTO accounts (firstName, lastName, email, password, profilePicture) VALUES ($1, $2, $3, $4, $5) RETURNING * ", 
            [firstName, lastName, email, hashedPassword, "fakeURL"]
        );
        // gather data from query
        const result = {
            id: queryResult.rows[0].id,
            firstName: queryResult.rows[0].firstname,
            lastName: queryResult.rows[0].lastname,
            email: queryResult.rows[0].email,
            dateCreated: queryResult.rows[0].datecreated,
            profilePicture: queryResult.rows[0].profilepicture,
            adminRole: queryResult.rows[0].adminrole
        }
        const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWTSECRET, { expiresIn: expiration });
        // send response
        res.status(200).json({ result, token }); 
    } catch (err) {
        console.log(err);
        if (err.code == '23505') {
            return res.status(404).json({ message: "Account with this email already exists" });
        }
        res.status(500).json({ message: "An error occurred while creating your account" });
    }
}