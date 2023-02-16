import format from "pg-format";
import { iUserResultWithoutPassword, iUserUpdate, iUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";
import { AppError } from "../../errors";

export async function updateUser(idParams: number, idToken: number, admin: boolean, user: iUserUpdate): Promise<iUserWithoutPassword> {
    if (!admin && idParams !== idToken) throw new AppError("Insufficient Permission", 403);
    
    const queryString: string = format(`---sql
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE 
            id = %s
        RETURNING *;
    `,
    Object.keys(user),
    Object.values(user),
    idParams
    );   

    const queryResult: iUserResultWithoutPassword = await client.query(queryString);

    return returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
}