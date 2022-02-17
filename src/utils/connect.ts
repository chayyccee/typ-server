import mongoose from "mongoose";
import config from "config";
import loggerinstance from "./logger";

const connect = () => {
    const dbUri = config.get<string>("db_url");

    return mongoose.connect(dbUri)
        .then(() => loggerinstance.info("Connected to MongoDB successfully"))
        .catch(err => {
            loggerinstance.error("Error connecting to MongoDB", err);
            process.exit(1);
        });
};

export default connect;