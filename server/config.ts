import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    //MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/loggerdb',
    JWT_SECRET: process.env.JWT_SECRET || 'something-very-very-secret'
};