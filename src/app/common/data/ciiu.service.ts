import { inject, Injectable } from '@angular/core';
import { ApiCiiuService } from '@app/api/data';

@Injectable({
  providedIn: 'root'
})
export class CiiuService {
  private readonly _api = inject(ApiCiiuService);
  public readonly list: CiiuList;
  constructor() { 
    this.list = new CiiuList(this._api);
  }
}

export interface ICiiu {
  code: string;
  name: string;
}

class CiiuList {
  private _list: ICiiu[] = [];
  private _loaded: boolean = false;
  constructor(private _api: ApiCiiuService){}

  getAll(data?: { refresh?: boolean }): Promise<ICiiu[]>{
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
