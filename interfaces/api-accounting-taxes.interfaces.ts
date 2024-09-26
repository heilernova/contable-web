export interface APITypeTax {
    id: string;
    name: string
}

export interface APITaxInfo {
    id: string;
    type: string;
    name: string;
    fee: number;
    sales: string;
    sales_returns: string;
    purchases: string;
    purchases_returns: string;
}

export interface APITaxCreate {
    type: string;
    name: string;
    fee: number;
    sales_returns: string;
    purchases: string;
    purchases_returns: string;
}

export interface APITaxUpdate {
    type?: string;
    name?: string;
    fee?: number;
    sales_returns?: string;
    purchases?: string;
    purchases_returns?: string;
}