import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const auth = (req, res, next) => {
    try {
        console.log("auth middleware");
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({ message: "Access Denied: token not provided" });
        } else {
            // validate JWT
            const tokenBody = token.split(" ")[1]; // exclude bearer
            jwt.verify(tokenBody, process.env.JWTSECRET, (err, decoded) => {
                if (err) {
                    console.log(`JWT Error: ${err}`);
                    return res.status(401).send({ message: "Access Denied: invalid token" });
                }
                // no error, JWT is good
                console.log("JWT token was valid");
                next();
            });
        }
    } catch (error) {
        console.log(error);
    }
}