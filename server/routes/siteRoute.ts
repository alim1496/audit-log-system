import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import LogModel from "../models/logModel";
import SiteModel, { Site } from "../models/siteModel";
import { isAuth } from "../utils";

const SiteRouter = Router();

SiteRouter.get("/:id", isAuth, async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Site ID"});
    };

    const _site = await SiteModel
        .findById(req.params.id)
        .populate("user", { fullName: 1 })
        .exec();

    if(_site) {
        res.status(201).send(_site);
    } else {
        res.status(404).send({ message: "No site found "});
    }   
});

SiteRouter.post("/", isAuth, (req: Request, res: Response) => {
    const { name, region, description, latitude, longitude, user } = req.body;
    const site = new SiteModel({
        name, region, user, latitude, longitude, description        
    });

    site
        .save()
        .then((data) => {
            new LogModel({ user: data.user._id, site: data._id, update: false }).save(); 
            res.status(201).send({ message: `Site created successfully with id ${data._id}`, data });
        })
        .catch(() => res.status(500).send({ message: "Could not create site." }));
});

SiteRouter.put("/:id", isAuth, (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Site ID"});
    };

    SiteModel
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((data) => {
            if(data) new LogModel({ user: data.user._id, site: data._id, update: true }).save();
            res.status(201).send({ message: "Site Updated Successfully.", data });
        })
        .catch(() => res.status(500).send({ message: "Could not create site." }));
});

export default SiteRouter;
