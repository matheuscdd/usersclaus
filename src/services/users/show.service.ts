import { client } from "../../database";
import { iUserResult, iUserResultWithoutPassword, iUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";


export async function showUsers(): Promise<iUserWithoutPassword[]> {
    const queryString: string = `--sql
        SELECT
            us.id,
            us.name,
            us.email,
            us.admin,
            us.active
        FROM
            users us
        ORDER BY 
            id ASC;
    `;
    const queryResult: iUserResultWithoutPassword = await client.query(queryString);

    return queryResult.rows;
}

export async function findUser(id: number): Promise<iUserWithoutPassword> {
    const queryString: string = `--sql
        SELECT
            *
        FROM 
            users
        WHERE 
            id = $1;
    `;

    const queryResult: iUserResult = await client.query(queryString, [id]);

    return returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
}