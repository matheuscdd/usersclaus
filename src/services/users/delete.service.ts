import { iUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";

export async function deleteUser(id: number, status: boolean, user: iUserWithoutPassword): Promise<void> {
    if (!status) throw new AppError("User already inactive", 400);
    
    if (!user.admin && id !== user.id) throw new AppError("Insufficient Permission", 403);

    const queryString: string = `--sql
        UPDATE 
            users
        SET 
            active = false
        WHERE 
            id = $1;
    `;

    await client.query(queryString, [id]);
}