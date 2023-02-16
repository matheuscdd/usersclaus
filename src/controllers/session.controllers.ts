import { loginUser } from "../services/session/login.service";
import { iToken } from "../interfaces/session.interfaces";
import { Request, Response } from "express";

export async function loginUserController(req: Request, res: Response): Promise<Response> {
    const token: iToken = await loginUser(req.body);

    return res.status(200).json(token);
}

