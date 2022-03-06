import { Schema, model } from "mongoose";

export interface User {
    fullName: string;
    userName: string;
    email: string;
    admin: boolean;
    password: string
}

const schema = new Schema<User> ({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const UserModel = model<User>("User", schema);

export default UserModel;
