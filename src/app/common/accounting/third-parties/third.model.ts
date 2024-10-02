import { ApiThirdPartiesService } from "@app/common/accounting/third-parties/services";
import { NzModalService } from "ng-zorro-antd/modal";
import { IThird, IThirdUpdate } from "./third.interfaces";
import { setPropertiesInObject } from "@app/common/utils";
import { ThirdModalComponent } from "./components/third-modal/third-modal.component";

export class Third {
    private readonly _api: ApiThirdPartiesService;
    private readonly _nzModalServices: NzModalService;
    
    public readonly id: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly tagId: string | null;
    public readonly taxpayerType: "natural" | "legal";
    public readonly nit: string;
    public readonly accountName: string;
    public readonly name: string | null;
    public readonly lastName: string | null;
    public readonly companyName: string | null;
    public readonly tradeName: string | null;
    public readonly isSupplier: boolean;
    public readonly isCustomer: boolean;
    public readonly department: string | null;
    public readonly city: string | null;
    public readonly address: string | null;
    public readonly email: string | null;
    public readonly cellphone: string | null;
    public readonly economicActivities: string[];
    public readonly responsibilities: number[];

    constructor(options: { data: IThird, api: ApiThirdPartiesService, nzModalServices: NzModalService }){
        this._api = options.api;
        this._nzModalServices = options.nzModalServices;

        this.id = options.data.id;
        this.createdAt = options.data.createdAt;
        this.updatedAt = options.data.updatedAt;
        this.tagId = options.data.tagId;
        this.taxpayerType = options.data.taxpayerType;
        this.nit = options.data.nit;
        this.accountName = options.data.accountName;
        this.name = options.data.name;
        this.lastName = options.data.lastName;
        this.companyName = options.data.companyName;
        this.tradeName = options.data.tradeName;
        this.isSupplier = options.data.isSupplier;
        this.isCustomer = options.data.isCustomer;
        this.department = options.data.department;
        this.city = options.data.city;
        this.address = options.data.address;
        this.email = options.data.email;
        this.cellphone = options.data.cellphone;
        this.economicActivities = options.data.economicActivities;
        this.responsibilities = options.data.responsibilities;
    }

    public edit(): void {
        this._nzModalServices.create({
            nzTitle: "Editar información",
            nzContent: ThirdModalComponent,
            nzData: this,
            nzWidth: "900px"
        })
    }

    public update(data: IThirdUpdate): Promise<void> {
        return new Promise((resolve, reject) => {
            this._api.update(this.id, data).subscribe({
                next: res => {
                    setPropertiesInObject(this, res);
                    resolve();
                },
                error: err => reject(err)
            })
        })
    }
}