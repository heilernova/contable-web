import { APITaxpayerType } from "./global.types";

export interface APIAccountingThirdInfo {
    id: string;
    createdAt: string;
    updatedAt: string;
    tagId: string;
    taxpayerType: APITaxpayerType;
    nit: string;
    accountName: string;
    name: string | null;
    lastName: string | null;
    companyName: string | null;
    tradeName: string | null;
    isSupplier: boolean;
    isCustomer: boolean;
    department: string | null;
    city: string | null;
    address: string | null;
    email: string | null;
    cellphone: string | null;
    economicActivities: string[];
    responsibilities: number[]
}

export interface APIAccountingThirdCreate {
    tag_id?: string;
    taxpayerType: APITaxpayerType;
    nit: string;
    name?: string | null;
    lastName?: string | null;
    companyName?: string | null;
    trade_name?: string | null;
    isSupplier?: boolean;
    isCustomer?: boolean;
    department?: string | null;
    city?: string | null;
    address?: string | null;
    email?: string | null;
    cellphone?: string | null;
    economicActivities?: string[];
    responsibilities?: number[]
}

export interface APIAccountingThirdUpdate {
    tag_id?: string;
    taxpayerType?: APITaxpayerType;
    nit?: string;
    name?: string | null;
    lastName?: string | null;
    companyName?: string | null;
    tradeName?: string | null;
    isSupplier?: boolean;
    isCustomer?: boolean;
    department?: string | null;
    city?: string | null;
    address?: string | null;
    email?: string | null;
    cellphone?: string | null;
    economicActivities?: string[];
    responsibilities?: number[]
}
