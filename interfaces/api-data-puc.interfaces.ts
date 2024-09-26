export interface APIDataPucAccount {
    code: string;
    name: string;
    description: string | null;
}

export interface APIDataPucAccountUpdate {
    name?: string;
    description?: string | null;
}