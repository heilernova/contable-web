export interface APIProfile {
    role: "admin" | "user" | "customer";
    isAccountant: boolean;
    name: string;
    lastName: string;
    sex: "M" | "F" | null;
    cellphone: string;
    email: string;
}

export interface APIProfileUpdate {
    role?: "admin" | "user" | "customer";
    isAccountant?: boolean;
    name?: string;
    lastName?: string;
    sex?: "M" | "F" | null;
    cellphone?: string;
    email?: string;
}

export interface APIProfilePasswordUpdate {
    password: string;
    pin: string;
}

export interface APIProfilePinUpdate {
    password: string;
    pin: string;
}