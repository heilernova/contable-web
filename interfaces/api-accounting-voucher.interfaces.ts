export interface APIVoucherType {
    id: string;
    name: string;
    enable: boolean,
    abbreviation: string | null;
    consecutive: number;
    description: string | null;
}

export type APIVoucherGroup = "income" | "sales" | "purchases" | "expenses" | "cost" | "transfers";
export type APIVoucherStatus = "entered" | "reviewed" | "revised" | "rejected" | "approved";

export interface APIAccountingVoucherInfo {
    id: string;
    created_at: string;
    updated_at: string;
    generated_at: string;
    status: APIVoucherStatus;
    group: APIVoucherGroup | null;
    tag_id: string;
    voucher_type: string;
    voucher_consecutive: number;
    third_id: string;
    prefix: string | null;
    folio: number | null;
    total: number;
    cude_cufe: string | null;
    data: { [key: string]: any };
    observation: string | null;
    items: APIAccountingVoucherItem[]
}

export interface APIAccountingVoucherItem {
    id: string;
    index: number;
    item_id: string | null;
    detail: string;
    cost: number | null;
    price: number;
    quantity: number;
    total: number;
    tax: number;
    serials: string[];
}

export interface APIAccountingVoucherCreate {
    generated_at: string;
    group?: APIVoucherGroup | null;
    tag_id?: string;
    voucher_type: string;
    third_id: string;
    prefix?: string | null;
    folio?: number | null;
    total: number;
    cude_cufe?: string;
    data: { [key: string]: any };
    observation: string | null;
    items: {
        item_id: string | null;
        detail: string;
        cost: number | null;
        price: number;
        quantity: number;
        total: number;
        tax: number;
        serials: string[];
    }[],
    records: APIAccountingVoucherRecords[]
}

export interface APIAccountingVoucherRecords
{
    id: string;
    account_id: string;
    third_id: string;
    index: number;
    detail: string;
    debit: number;
    credit: number;
    balance: number;
    observation: string;
}

export interface APIAccountingVoucherUpdate {
    generated_at: string;
    group?: APIVoucherGroup | null;
    tag_id?: string;
    voucher_type?: string;
    third_id?: string;
    prefix?: string | null;
    folio?: number | null;
    total?: number;
    cude_cufe?: string;
    data?: { [key: string]: any };
    observation?: string | null;
    items?: {
        item_id: string | null;
        detail: string;
        cost: number | null;
        price: number;
        quantity: number;
        total: number;
        tax: number;
        serials: string[];
    }[],
    records?: APIAccountingVoucherRecords[]
}