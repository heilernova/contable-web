import { IAccount } from "../accounts.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { AccountFormModalComponent } from "../components/account-form-modal/account-form-modal.component";
import { ApiAccountsService } from "@app/api/accounting/accounts";
import { setPropertiesInObject } from "@app/common/utils";

export class Account {
    private readonly _api: ApiAccountsService;
    private readonly _nzModalService: NzModalService;
    public readonly id: string;
    public readonly code: string;
    public readonly name: string;
    public readonly description: string | null;
    constructor(d: { data: IAccount, api: ApiAccountsService, nzModalService: NzModalService }){
        this.id = d.data.id;
        this.code = d.data.code;
        this.name = d.data.name;
        this.description = d.data.description;
        this._api = d.api;
        this._nzModalService = d.nzModalService;
    }

    public async update(data: { name: string, description?: string | null }): Promise<void> {
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

    public edit(){
        this._nzModalService.create({
            nzTitle: "Editar",
            nzContent: AccountFormModalComponent,
            nzWidth: "700px",
            nzData: this
        })
    }
}