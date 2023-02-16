import { iUser, iUserResult } from "../../interfaces/users.interfaces";
import { iToken, iUserLoginRequest } from "../../interfaces/session.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export async function loginUser(user: iUserLoginRequest): Promise<iToken> {
    const queryString: string = `--sql
        SELECT
            *
        FROM 
            users
        WHERE 
            email = $1;
    `;

    const queryResult: iUserResult = await client.query(queryString, [user.email]);
    
    if (!queryResult.rowCount) throw new AppError("Invalid email or password", 401);

    const userFound: iUser = queryResult.rows[0];
    const pwdMatch: boolean = await compare(user.password, userFound.password);


    if (!pwdMatch) throw new AppError("Invalid email or password", 401);

    const token: string = sign(
        { email: user.email },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: String(userFound.id) }
    );

    return { token }
}