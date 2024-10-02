import { OmitBy, OmitWithout, PartialWithout } from "@app/types";

export interface IThird {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    tagId: string | null;
    taxpayerType: "natural" | "legal";
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
    responsibilities: number[];
}

export interface IThirdCreate extends PartialWithout<OmitBy<IThird, "id" | "createdAt" | "updatedAt" | "accountName">, "taxpayerType" | "nit"> {}
export interface IThirdUpdate extends OmitBy<Partial<IThirdCreate>, "taxpayerType"> {}
export interface IThirdFormValues extends PartialWithout<OmitBy<IThird, "id" | "createdAt" | "updatedAt" | "accountName">, "taxpayerType" | "nit"> {}