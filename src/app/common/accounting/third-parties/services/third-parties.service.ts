import { inject, Injectable } from '@angular/core';
import { ApiThirdPartiesService } from './api-third-parties.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Third } from '../third.model';
import { ThirdModalComponent } from '../components/third-modal/third-modal.component';
import { IThirdFormValues } from '../third.interfaces';
import { SessionService } from '@app/authentication';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartiesService {
  private readonly _api = inject(ApiThirdPartiesService);
  private readonly _nzModalService = inject(NzModalService);
  private readonly _session = inject(SessionService);

  private _list: Third[] = [];
  private _loaded: boolean = false;

  constructor() { 
    this._session.sessionChange.subscribe(() => {
      this._list = [];
      this._loaded = false;
    })
  }

  getAll(options?: { refresh?: boolean }): Promise<Third[]>{
    return new Promise((resolve, reject) => {
      if (this._loaded && !options?.refresh){
        resolve(this._list);
        return;
      }

      this._api.getAll().subscribe({
        next: res => {
          this._list = res.map(x => new Third({ data: x, api: this._api, nzModalServices: this._nzModalService }));
          this._loaded = true;
          resolve(this._list);
        },
        error: err => reject(err)
      })
    })
  }

  create(values: IThirdFormValues){
    return new Promise((resolve, reject) => {
      this._api.create(values).subscribe({
        next: res => {
          let third = new Third({ data: res, api: this._api, nzModalServices: this._nzModalService });
          this._list.push(third);
          resolve(third);
        },
        error: err => reject(err)
      })
    });
  }

  register(): Promise<Third>{
    return new Promise((resolve, reject) => {
      this._nzModalService.create({
        nzTitle: "Registrar tercero",
        nzContent: ThirdModalComponent,
        nzWidth: "900px"
      })
    })
  }

}
