import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel, { User } from "../models/userModel";
import { getToken } from "../utils";

const UserRouter = Router();

UserRouter.post("/signup", (req: Request, res: Response) => {    
    new UserModel({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .save()
    .then((_user: User) => {
        res.status(201).send({ message: "Account created successfully." });
    })
    .catch((err) => {
        res.status(500).send({ message: `${err}` });
    });
});

UserRouter.post("/login", async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ userName: req.body.userName });
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(202).send({ message: "Successfully logged in", token: getToken(user) });
    } else {
        res.status(404).send({ message: "No user found" });
    }
});

export default UserRouter;