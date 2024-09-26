export interface APIAccountingAccount {
    id: string;
    name: string;
    description: string | null;
}

export interface APIAccountingAccountCreate {
    name: string;
    description?: string | null;
}

export interface APIAccountingAccountUpdate {
    name?: string;
    description?: string | null;
}