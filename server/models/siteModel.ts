import { Schema, model, Types } from "mongoose";

interface Site {
    name: string;
    region: string;
    description: string;
    latitude: number;
    longitude: number;
    user: Types.ObjectId
}

const schema = new Schema<Site> ({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const SiteModel = model("Site", schema);

export default SiteModel;
