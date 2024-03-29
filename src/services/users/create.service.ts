import { iUserRequest, iUserResultWithoutPassword, iUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

export async function createUser(user: iUserRequest): Promise<iUserWithoutPassword> {
    const queryString: string = format(`--sql
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING *;
    `,
    Object.keys(user),
    Object.values(user)
    );

    const queryResult: iUserResultWithoutPassword = await client.query(queryString);

    return returnUserSchemaWithoutPassword.parse(queryResult.rows[0])
}