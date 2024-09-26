import { APITaxpayerType } from "./global.types";

export interface APIAccountingThirdInfo {
    id: string;
    created_at: string;
    updated_at: string;
    tag_id: string;
    taxpayer_type: APITaxpayerType;
    nit: string;
    account_name: string;
    name: string | null;
    last_name: string | null;
    company_name: string | null;
    trade_name: string | null;
    is_supplier: boolean;
    is_customer: boolean;
    department: string | null;
    city: string | null;
    address: string | null;
    email: string | null;
    cellphone: string | null;
    economic_activities: string[];
    responsibilities: string[]
}

export interface APIAccountingThirdCreate {
    tag_id?: string;
    taxpayer_type: APITaxpayerType;
    nit: string;
    name?: string | null;
    last_name?: string | null;
    company_name?: string | null;
    trade_name?: string | null;
    is_supplier?: boolean;
    is_customer?: boolean;
    department?: string | null;
    city?: string | null;
    address?: string | null;
    email?: string | null;
    cellphone?: string | null;
    economic_activities?: string[];
    responsibilities?: string[]
}

export interface APIAccountingThirdUpdate {
    tag_id?: string;
    taxpayer_type?: APITaxpayerType;
    nit?: string;
    name?: string | null;
    last_name?: string | null;
    company_name?: string | null;
    trade_name?: string | null;
    is_supplier?: boolean;
    is_customer?: boolean;
    department?: string | null;
    city?: string | null;
    address?: string | null;
    email?: string | null;
    cellphone?: string | null;
    economic_activities?: string[];
    responsibilities?: string[]
}
