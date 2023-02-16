import { iUserResult } from "../interfaces/users.interfaces";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { client } from "../database";

export async function ensureUserExistsMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id: number = Number(req.params.id);

    if (isNaN(id)) throw new AppError("Id format is a number", 400);

    const queryString: string = `--sql
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

    const queryResult: iUserResult = await client.query(queryString, [id]);

    if (!queryResult.rowCount) throw new AppError("User not found", 404);

    req.userParams = queryResult.rows[0];
    req.id = id;

    return next();
}