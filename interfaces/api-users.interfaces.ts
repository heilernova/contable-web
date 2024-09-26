import { APIUserRole, APIUserStatus } from "./global.types";

export interface APIUserInfo {
    id: string;
    created_at: string;
    updated_at: string;
    role: APIUserRole;
    is_accountant: boolean;
    status: APIUserStatus;
    username: string;
    email: string;
    last_name: string;
    cellphone: string;
    permissions: string[];
}

export interface APIUserCreate {
    is_accountant: boolean;
    username: string;
    email: string;
    last_name: string;
    cellphone: string;
    permissions: string[];
}

export interface APIUserUpdate {
    is_accountant?: boolean;
    username?: string;
    email?: string;
    last_name?: string;
    cellphone?: string;
    permissions?: string[];
}