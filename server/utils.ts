import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "./config";
import { User } from "./models/userModel";

export const getToken = (user: User) => {
    const { userName, email, fullName } = user;
    return jwt.sign({
        userName, email, fullName
    },
    config.JWT_SECRET,
    {
        expiresIn: '1h'
    }
    );
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({ message: "Token is not supplied" });
    }
};
