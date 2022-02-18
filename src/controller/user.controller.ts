import { Request, Response } from "express";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import loggerInstance from "../utils/logger";

export const createUserHandler = async (req: Request<{}, {}, createUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    }
    catch (error: any) {
        loggerInstance.error(error);
        res.status(409).send(error.message);
    }
};

