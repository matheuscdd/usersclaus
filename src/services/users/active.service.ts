import { client } from "../../database";
import { iUserResult, iUser, iUserWithoutPassword } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";


export async function activeUser(id: number, status: boolean): Promise<iUserWithoutPassword> {
    if (status) throw new AppError("User already active", 400);

    const queryString: string = `--sql
        UPDATE
            users
        SET
            active = true
        WHERE 
            id = $1
        RETURNING *;
    `;

    const queryResult: iUserResult = await client.query(queryString, [id]);

    return returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
}