import { APIUserRole } from "./global.types";

export interface APIAuthResponse {
    id: string;
    name: string;
    role: APIUserRole;
    isAccountant: boolean;
    permissions: string[];
    company?: {
        id: string;
        nit: string;
        name: string;
    };
    pin: string | null;
    token: string;
}

export interface APIAuthCredentials {
    username: string;
    password: string;
}
