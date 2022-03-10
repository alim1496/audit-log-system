import { Schema, model, Types } from "mongoose";

export interface Log {
    site: Types.ObjectId;
    user: Types.ObjectId;
    update: boolean;
}

const schema = new Schema<Log>({
    site: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Site"
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    update: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const LogModel = model("Log", schema);

export default LogModel;
