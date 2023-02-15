import { QueryResult } from "pg";

export interface iUserRequest {
	name: string;
	email: string;
	password: string;
	admin: boolean; 
	active: boolean;
}

export interface iUser extends iUserRequest {
    id: number;
}

export type iUserWithoutPassword = Omit<iUser, "password">;

export type iUserResult = QueryResult<iUser>;

export type iUserResultWithoutPassword = QueryResult<iUserWithoutPassword>; 