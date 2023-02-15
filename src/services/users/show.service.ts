import { client } from "../../database";
import { iUserResultWithoutPassword, iUserWithoutPassword } from "../../interfaces/users.interfaces";


export async function showUsers(): Promise<iUserWithoutPassword[]> {
    const queryString: string = `--sql
        SELECT
            us.id,
            us.name,
            us.email,
            us.admin,
            us.active
        FROM
            users us;
    `;
    const queryResult: iUserResultWithoutPassword = await client.query(queryString);

    return queryResult.rows;
}

export async function findUser(idUser: number): Promise<iUserWithoutPassword> {
    const queryString: string = `--sql
        SELECT
            us.id,
            us.name,
            us.email,
            us.admin,
            us.active
        FROM 
            users us
        WHERE 
            id = $1;
    `;

    const queryResult: iUserResultWithoutPassword = await client.query(queryString, [idUser]);

    return queryResult.rows[0];
}