import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import LogModel from "../models/logModel";
import { isAuth } from "../utils";

const LogRouter = Router();

LogRouter.get("/:id", isAuth, (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Site ID"});
    };
    
    LogModel
        .find({ site: req.params.id })
        .populate("site", { name: 1 })
        .populate("user", { fullName: 1 })
        .exec()
        .then(result => {
            res.status(200).send({ result });
        })
        .catch(error => {
            res.status(404).send({ message: "Did not find any log." });
        });
});

export default LogRouter;
