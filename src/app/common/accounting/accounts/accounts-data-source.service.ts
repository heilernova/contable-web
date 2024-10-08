import { inject, Injectable } from '@angular/core';
import { ApiAccountsService } from '@app/api/accounting/accounts';
import { TreeAccountsNode } from './models/account-tree.model';
import { AccountsService } from './accounts.service';


@Injectable({
  providedIn: 'root'
})
export class AccountsDataSourceService {
  private readonly _api = inject(ApiAccountsService);
  private readonly _accounts = inject(AccountsService)
  private _tree: TreeAccountsNode[] = [];

  constructor() { }

  getTree(): Promise<TreeAccountsNode[]>{
    return new Promise((resolve, reject) => {
      this._api.getTree().subscribe({
        next: res => {
          this._tree = res.map(x => new TreeAccountsNode(x, { accountsServicie: this._accounts }));
          resolve(this._tree);
        },
        error: err => reject(err)
      })
    })
  }
}



export interface ITreeAccountNode {
  id: string;
  code: string;
  name: string;
  children: ITreeAccountNode[]
}