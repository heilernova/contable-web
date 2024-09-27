export interface ICompany {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    taxpayerType: "natural" | "legal";
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
    }[];
    access: { enable: boolean, permissions: string[] } | null;
}

export interface ICompanyFormValues {
    taxpayerType: "natural" | "legal";
    nit: string;
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
    }[];
}