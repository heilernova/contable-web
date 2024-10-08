import { inject, Injectable } from '@angular/core';
import { ApiPucService } from '@app/api/data';
import { IPucTreeAccount } from './puc.interfaces';
import { IAccount } from '@app/common/accounting/accounts';
import { IPucAccount } from './puc.interface';

@Injectable({
  providedIn: 'root'
})
export class PucDataSourceService {
  private readonly _api = inject(ApiPucService);
  private _list: IPucAccount[] = []
  private _tree: IPucTreeAccount[] = [];

  constructor() { }

  getTree(): Promise<IPucTreeAccount[]> {
    return new Promise((resolve, reject) => {
      if (this._tree.length == 0){
        this._api.getAll(true).subscribe({
          next: res => {
            this._tree = res;
            resolve(this._tree)
          },
          error: err => reject(err)
        })
      } else {
        resolve(this._tree);
      }
    })
  }

  getAll(): Promise<IPucAccount[]> {
    return new Promise((resolve, reject) => {
      if (this._list.length > 0){
        resolve(this._list);
      } else {
        this._api.getAll().subscribe({
          next: list => {
            this._list = list;
            resolve(list)
          },
          error: err =>  reject(err)
        })
      }
    })
  }

  get(code: string): Promise<IPucAccount | undefined>{
    return new Promise((resolve, reject) => {
      if (this._list.length > 0){
        resolve(this._list.find(x => x.code == code));
      } else {
        this._api.getAll().subscribe({
          next: list => {
            this._list = list;
            resolve(this._list.find(x => x.code == code));
          },
          error: err =>  reject(err)
        })
      }
    })
  }
}

