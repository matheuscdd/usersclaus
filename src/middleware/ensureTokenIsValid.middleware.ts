import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors";
import { iUserResult } from "../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../schemas/users.schemas";
import "dotenv/config";

export async function ensureTokenIsValidMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let token: string = req.headers.authorization!;

    if (!token) throw new AppError("Missing authorization token", 401);

    token = token.split(" ")[1];

    const queryString: string = `--sql
        SELECT
            *   
        FROM
            users
        WHERE
            email = $1;
    `;

    async function check(error: any, decoded: any) {
        if (error) throw new AppError(error.message, 401);

        const queryResult: iUserResult = await client.query(queryString, [decoded.email]);

        if (!queryResult.rowCount) throw new AppError("User not found", 404);

        req.user = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
    }

    await verify(token, String(process.env.SECRET_KEY), check);

    req.token = token;

    return next();
}