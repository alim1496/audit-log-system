import jwt, { VerifyErrors } from "jsonwebtoken";
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
    if (req.cookies && req.cookies.token) {
        const _token = JSON.parse(req.cookies.token);
        jwt.verify(_token, config.JWT_SECRET, (err: VerifyErrors | null, decode: any | undefined) => {
            if (err) {
                res.status(401).send({ message: err });
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({ message: "Token is not supplied" });
    }
};
