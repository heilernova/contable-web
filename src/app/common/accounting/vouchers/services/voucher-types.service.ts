import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SessionService } from '@app/authentication';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VoucherTypesModalComponent } from '../components/voucher-types-modal/voucher-types-modal.component';
import { VoucherTypeModalComponent } from '../components/voucher-type-modal/voucher-type-modal.component';

@Injectable({
  providedIn: 'root'
})
export class VoucherTypesService {
  private readonly _session = inject(SessionService);
  private readonly _http = inject(HttpClient);
  private readonly _nzModalService = inject(NzModalService);

  private _list: IVoucherType[] = [];
  private _loaded: boolean = false;

  constructor() { 
    this._session.sessionChange.subscribe(() => {
      this._list = [];
      this._loaded = false;
    })
  }

  getAll(options?: { refresh?: boolean }): Promise<IVoucherType[]> {
    return new Promise((resolve, reject) => {

      if (this._loaded && !options?.refresh){
        resolve(this._list);
        return;
      }

      this._http.get<IVoucherType[]>("accounting/voucher-types").subscribe({
        next: res => {
          this._list = res;
          this._loaded = true;
          resolve(res);
        },
        error: err => {
          reject(err);
        }
      })
    })
  }

  create(){
    this._nzModalService.create({
      nzTitle: "Crear tipo de comprobante",
      nzContent: VoucherTypeModalComponent,
      nzWidth: "700px"
    })
  }

  select(options?: { multi?: boolean }){
    return new Promise((resolve, reject) => {
      this._nzModalService.create({
        nzTitle: "Tipos de comprobantes",
        nzContent: VoucherTypesModalComponent,
        nzData: options
      })
    })
  }
}

export interface IVoucherType  {
  id: string;
  enable: boolean;
  name: string;
  abbreviation: string | null;
  consecutive: number;
  description: string | null
}
