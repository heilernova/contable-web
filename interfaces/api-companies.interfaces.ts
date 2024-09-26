import { APITaxpayerType } from "./global.types";

export interface APICompanyInfo {
    id: string;
    createdAt: string;
    updatedAt: string;
    taxpayerType: APITaxpayerType;
    status: "enable" | "disable";
    nit: string;
    accountName: string;
    name: string | null;
    lastName: string | null;
    companyName: string | null;
    tradeName: string | null;
    email: string;
    cellphone: string;
    department: string;
    city: string;
    address: string;
    economicActivities: string[];
    responsibilities: number[];
    contacts: {
        role: string;
        name: string;
        cellphone: string;
        email: string;
        observation: string | null
    }[],
    access: { enable: boolean, permissions: string[] } | null
}

export interface APICompanyCreateBody {
    taxpayerType: APITaxpayerType;
    nit: string;
    name?: string | null;
    lastName?: string | null;
    companyName?: string | null;
    tradeName?: string | null;
    email: string;
    cellphone: string;
    department: string;
    city: string;
    address: string;
    economic_activities?: string[];
    responsibilities?: number[];
    contacts?: {
        role: string;
        name: string;
        cellphone: string;
        email: string;
        observation: string | null
    }[]
} 

export interface APICompanyUpdateBody {
    taxpayerType?: APITaxpayerType;
    nit?: string;
    name?: string | null;
    last_name?: string | null;
    companyName?: string | null;
    tradeName?: string | null;
    email?: string;
    cellphone?: string;
    department?: string;
    city?: string;
    address?: string;
    economicActivities?: string[];
    responsibilities?: number[];
    contacts?: {
        role: string;
        name: string;
        cellphone: string;
        email: string;
        observation: string | null
    }[]
}

export interface APICompanyCollaboratorCreate {
    userId: string;
    permissions: string[];
}

export interface APICompanyCollaboratorUpdate {
    enable?: boolean;
    permissions?: string[];
}