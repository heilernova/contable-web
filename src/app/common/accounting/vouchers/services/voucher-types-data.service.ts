import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SessionService } from '@app/authentication';
import { VoucherType } from '../model/voucher-type.model';
import { IVoucherType } from './voucher-types.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherTypesDataService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _session: SessionService = inject(SessionService);
  private readonly _nzModalService: NzModalService = inject(NzModalService);
  
  private _dataSource: VoucherType[] = [];
  private _loaded: boolean = false;

  public readonly changeDataSource: BehaviorSubject<VoucherType[]> = new BehaviorSubject<VoucherType[]>([]);

  constructor() { 
    this._session.sessionChange.subscribe(() => {
      this._dataSource = [];
      this._loaded = false;
      this.changeDataSource.next([]);
    });
  }

  getAll(options?: { refresh?: boolean }): Promise<VoucherType[]> {
    return new Promise((resolve, reject) => {

      if (this._loaded && !options?.refresh){
        resolve(this._dataSource.slice());
        return;
      }

      this._http.get<IVoucherType[]>("accounting/voucher-types").subscribe({
        next: res => {
          this._dataSource = res.map(x => new VoucherType({ data: x, nzModalService: this._nzModalService }));
          this._loaded = true;
          this.changeDataSource.next(this._dataSource.slice());
          resolve(this._dataSource);
        },
        error: err => {
          reject(err);
        }
      })
    })
  }

  register(data: { name: string, abbreviation?: string | null, description?: string | null }): Promise<VoucherType> {
    return new Promise((resolve, reject) => {
      this._http.post<IVoucherType>("accounting/voucher-types", data).subscribe({
        next: res => {
          let voucherType = new VoucherType({ data: res, nzModalService: this._nzModalService });
          this._dataSource.push(voucherType);
          this._dataSource.sort((a, b) => a.name.localeCompare(b.name));
          this.changeDataSource.next(this._dataSource.slice());
          resolve(voucherType);
        },  
        error: err => reject(err)
      });
    })
  }
}
