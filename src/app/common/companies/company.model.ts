import { APICompanyInfo } from "@api/interfaces";
import { NzModalService } from "ng-zorro-antd/modal";
import { CompanyPreviewInfoModalComponent } from "./components/company-preview-info-modal/company-preview-info-modal.component";
import { CompanyFormModalComponent } from "./components/company-form-modal/company-form-modal.component";
import { ICompany, ICompanyFormValues } from "./interfaces/company.interfaces";
import { ApiCompaniesService } from "@app/api/companies";
import { setPropertiesInObject } from "../utils";
import { BehaviorSubject } from "rxjs";

const parseAPIResponseToData = (data: APICompanyInfo): ICompany => {
  return {
    id: data.id,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    taxpayerType: data.taxpayerType,
    status: data.status,
    nit: data.nit,
    accountName: data.accountName,
    name: data.name,
    lastName: data.lastName,
    companyName: data.companyName,
    tradeName: data.tradeName,
    email: data.email,
    cellphone: data.cellphone,
    department: data.department,
    city: data.city,
    address: data.address,
    economicActivities: data.economicActivities,
    responsibilities: data.responsibilities,
    contacts: data.contacts,
    access: data.access,
  }
}

export class Company {
    private readonly _nzModalService: NzModalService;
    private readonly _api: ApiCompaniesService;

    public readonly id: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly taxpayerType: "natural" | "legal";
    public readonly status: "enable" | "disable";
    public readonly nit: string;
    public readonly accountName: string;
    public readonly name: string | null;
    public readonly lastName: string | null;
    public readonly companyName: string | null;
    public readonly tradeName: string | null;
    public readonly email: string;
    public readonly cellphone: string;
    public readonly department: string;
    public readonly city: string;
    public readonly address: string;
    public readonly economicActivities: string[];
    public readonly responsibilities: number[];
    public readonly contacts: {
        role: string;
        name: string;
        cellphone: string;
        email: string;
        observation: string | null
    }[];
    public readonly access: { enable: boolean, permissions: string[] } | null;
  
    public change: BehaviorSubject<ICompany>;

    constructor(p: { data: APICompanyInfo, nzModalService: NzModalService, api: ApiCompaniesService }){
      let data = parseAPIResponseToData(p.data);
      this._api = p.api;
      this._nzModalService = p.nzModalService;

      this.id = data.id;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.taxpayerType = data.taxpayerType;
      this.status = data.status;
      this.nit = data.nit;
      this.accountName = data.accountName;
      this.name = data.name;
      this.lastName = data.lastName;
      this.companyName = data.companyName;
      this.tradeName = data.tradeName;
      this.email = data.email;
      this.cellphone = data.cellphone;
      this.department = data.department;
      this.city = data.city;
      this.address = data.address;
      this.economicActivities = data.economicActivities;
      this.responsibilities = data.responsibilities;
      this.contacts = data.contacts;
      this.access = data.access;

      this.change = new BehaviorSubject<ICompany>(data)
    }
  
    previewModal(){
      this._nzModalService.create({
        nzTitle: this.accountName,
        nzContent: CompanyPreviewInfoModalComponent,
        nzData: this
      })
    }

    edit(){
      this._nzModalService.create({
        nzTitle: "Editar información",
        nzContent: CompanyFormModalComponent,
        nzData: this,
        // nzWidth
        nzClassName: "company-modal",
        nzDraggable: true,
        nzWidth: "900px"
      })
    }

    update(data: Partial<ICompanyFormValues>): Promise<void> {
      return new Promise((resolve, reject) => {
        this._api.update(this.id, data).subscribe({
          next: res => {
            let data = parseAPIResponseToData(res);
            setPropertiesInObject(this, data);
            this.change.next(data);
            resolve();
          },
          error: err => reject(err)
        })
      })
    }
  }