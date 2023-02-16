import { iUserWithoutPassword } from "../interfaces/users.interfaces";
import { findUser, showUsers } from "../services/users/show.service";
import { createUser } from "../services/users/create.service";
import { Request, Response } from "express";
import { profileUser } from "../services/users/profile.service";

export async function showUserController(req: Request, res: Response): Promise<Response> {
    const users: iUserWithoutPassword[]  = await showUsers();

    return res.status(200).json(users);
}

export async function findUserController(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPassword = await findUser(req.id!);

    return res.status(200).json(user);
}

export async function createUserController(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPassword = await createUser(req.body);

    return res.status(201).json(user);
}

export async function profileUserController(req: Request, res: Response): Promise<Response> {
    const userProfile = await profileUser(req.user!);

    return res.status(200).json(userProfile);
}
