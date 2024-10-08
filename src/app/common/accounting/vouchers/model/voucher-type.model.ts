import { NzModalService } from "ng-zorro-antd/modal";
import { IVoucherType } from "../services/voucher-types.service";
import { VoucherTypeModalComponent } from "../components/voucher-type-modal/voucher-type-modal.component";

export class VoucherType {
    private readonly _nzModalService: NzModalService;

    public readonly id: string;
    public readonly name: string;
    public readonly consecutive: number;
    public readonly abbreviation: string | null;
    public readonly description: string | null;
    constructor(options: { data: IVoucherType, nzModalService: NzModalService }){
        this.id = options.data.id;
        this.name = options.data.name;
        this.consecutive = options.data.consecutive;
        this.description = options.data.description;
        this.abbreviation = options.data.abbreviation;
        this._nzModalService = options.nzModalService;
    }

    public update(data: { name?: string, abbreviation?: string, description?: string  }): Promise<void> {
        return new Promise((resolve, reject) => {

        });
    }

    public edit(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._nzModalService.create({
                nzTitle: "Editar tipo de comprobante",
                nzContent: VoucherTypeModalComponent,
                nzWidth: "700px",
                nzData: this,
            }).afterClose.subscribe(() => resolve());
        })
    }
}