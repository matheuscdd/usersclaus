import { verify } from "jsonwebtoken";
import { AppError } from "../../errors";
import { client } from "../../database";
import { iUser, iUserResult } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";
import "dotenv/config";

export async function profileUser(token: string) {
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
        const userFound: iUser = queryResult.rows[0];
        
        return returnUserSchemaWithoutPassword.parse(userFound);
    }

    const result = verify(
        token,
        String(process.env.SECRET_KEY),
        check
    );

    return result;
}