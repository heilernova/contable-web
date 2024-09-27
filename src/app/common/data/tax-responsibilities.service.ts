import { inject, Injectable } from '@angular/core';
import { ApiTaxResponsibilitiesService } from '@app/api/data';

@Injectable({
  providedIn: 'root'
})
export class TaxResponsibilitiesService {

  private readonly _api = inject(ApiTaxResponsibilitiesService);
  public readonly list: TaxResponsibilitiesList;
  constructor() { 
    this.list = new TaxResponsibilitiesList(this._api);
  }
}

export interface ITaxResponsibilities {
  id: number;
  name: string;
  description: string | null;
}

class TaxResponsibilitiesList {
  private _list: ITaxResponsibilities[] = [];
  private _loaded: boolean = false;
  constructor(private _api: ApiTaxResponsibilitiesService){}

  getAll(data?: { refresh?: boolean }): Promise<ITaxResponsibilities[]>{
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