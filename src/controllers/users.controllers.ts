import { iUserWithoutPassword } from "../interfaces/users.interfaces";
import { findUser, showUsers } from "../services/users/show.service";
import { createUser } from "../services/users/create.service";
import { Request, Response } from "express";
import { profileUser } from "../services/users/profile.service";
import { deleteUser } from "../services/users/delete.service";
import { activeUser } from "../services/users/active.service";
import { updateUser } from "../services/users/update.service";

export async function showUsersController(req: Request, res: Response): Promise<Response> {
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
    const userProfile = await profileUser(req.userToken!);

    return res.status(200).json(userProfile);
}

export async function deleteUserController(req: Request, res: Response): Promise<Response> {
    await deleteUser(req.id!, req.userParams!.active, req.userToken!);

    return res.status(204).send();
}

export async function activeUserController(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPassword = await activeUser(req.id!, req.userParams!.active);

    return res.status(200).json(user);
}

export async function updateUserController(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPassword = await updateUser(req.id!, req.userToken!.id, req.userToken!.admin!, req.body);

    return res.status(200).json(user);
}