import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SessionService } from '@app/authentication';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AccountFormModalComponent } from './components/account-form-modal/account-form-modal.component';
import { Account } from './account.model';
import { ApiAccountsService } from '@app/api/accounting/accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _api: ApiAccountsService = inject(ApiAccountsService);
  private readonly _session: SessionService = inject(SessionService);
  private readonly _nzModalService = inject(NzModalService);
  
  public readonly accountList: AccountList;

  constructor() { 
    this.accountList = new AccountList({ api: this._api, nzModalService: this._nzModalService });
    this._session.sessionChange.subscribe(value => {
      this.accountList.setCompanyId(value?.company?.id ?? "")
    })
  }

  register(){
    this._nzModalService.create({
      nzTitle: "Registrar cuenta",
      nzContent: AccountFormModalComponent
    })
  }
}

export interface IAccount {
  id: string;
  code: string;
  name: string;
  description: string | null;
}

export class AccountList {
  private readonly _api: ApiAccountsService;
  private readonly _nzModalServices: NzModalService;

  private _companyId: string = "";
  private _list: Account[] = [];
  private _loaded: boolean = false;
  constructor(a: { api: ApiAccountsService, nzModalService: NzModalService  }){
    this._api = a.api;
    this._nzModalServices = a.nzModalService;
  }

  public setCompanyId(value: string): void {
    this._companyId = value;
  }

  public getAll(refresh?: boolean): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      if (this._loaded && !refresh){
        resolve(this._list);
        return;
      }

      this._api.getAll().subscribe({
        next: res => {
          this._list = res.map(x => new Account({ data: x, api: this._api, nzModalService: this._nzModalServices }));;
          this._loaded = true;
          resolve(this._list);
        },
        error: err => reject(err)
      })
    })
  }

  public create(data: { code: string, name: string, description?: string | null }): Promise<IAccount> {
    return new Promise((resolve, reject) => {
      this._api.create(data).subscribe({
        next: res => {
          let account = new Account({ data: res, api: this._api, nzModalService: this._nzModalServices });
          this._list.push(account);
          resolve(account);
        },
        error: err => reject(err)
      })
    })
  }
}