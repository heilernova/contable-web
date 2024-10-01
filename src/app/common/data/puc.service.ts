import { inject, Injectable } from '@angular/core';
import { ApiPucService } from '@app/api/data';

@Injectable({
  providedIn: 'root'
})
export class PucService {
  private readonly _api = inject(ApiPucService);
  private _tree: PucTree = [];
  public readonly list: PucList;
  
  constructor() { 
    this.list = new PucList(this._api);
  }

  getTree(): Promise<PucTree> {
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
}

export interface IPucAccount {
  code: string;
  name: string;
}

export type PucTree = {
  code: string,
  name: string,
  groups: {
    code: string,
    name: string,
    accounts: {
      code: string,
      name: string,
      subAccounts: {
        code: string,
        name: string
      }[]
    }[]
  }[]
}[]
class PucList {
  private _list: IPucAccount[] = [];
  private _loaded: boolean = false;
  constructor(private _api: ApiPucService){}

  getAll(data?: { refresh?: boolean }): Promise<IPucAccount[]>{
    return new Promise((resolve, reject) => {

      if (this._loaded && !data?.refresh){
        resolve(this._list);
        return;
      }

      this._api.getAll().subscribe({
        next: list => {
          this._list = list;
          this._loaded = true;
          resolve(this._list);
        },
        error: err => reject(err)
      })

    })
  }
}