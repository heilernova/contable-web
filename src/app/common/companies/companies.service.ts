import { inject, Injectable } from '@angular/core';
import { APICompanyInfo } from '@api/interfaces';
import { ApiCompaniesService } from '@app/api/companies';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CompanyPreviewInfoModalComponent } from './components/company-preview-info-modal/company-preview-info-modal.component';
import { Company } from './company.model';
import { CompanyFormModalComponent } from './components/company-form-modal/company-form-modal.component';
import { ICompanyFormValues } from './interfaces/company.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly _apiCompanies = inject(ApiCompaniesService);
  private readonly _modalService: NzModalService = inject(NzModalService);

  public readonly list: CompaniesList;
  
  constructor() { 
    this.list = new CompaniesList(this._apiCompanies, this._modalService);
  }

  register(){
    return new Promise((resolve, reject) => {
      this._modalService.create({
        nzTitle: "Registrar empresa",
        nzContent: CompanyFormModalComponent,
        nzClassName: "company-modal",
        nzDraggable: true,
        nzWidth: "900px"
      }).afterClose.subscribe(company => {
        resolve(company);
      })
    })
  }
}


class CompaniesList {
  private _list: Company[] = [];
  private _loaded: boolean = false;
  constructor(private _api: ApiCompaniesService, private _nzModalService: NzModalService){}

  getAll(data?: { refresh?: boolean }): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      if (this._loaded && !data?.refresh){
        resolve(this._list);
        return;
      }

      this._api.getAll().subscribe({
        next: res => {
          this._list = res.map(x => new Company({ data: x, api: this._api, nzModalService: this._nzModalService }));
          this._loaded = true;
          resolve(this._list);
        },
        error: err => {
          reject(err);
        }
      })

    })
  }

  get(value: string): Promise<Company | undefined> {
    return new Promise((resolve, reject) => {
      let company: Company | undefined = this._list.find(x => x.id == value);
      if (company) {
        resolve(company);
        return;
      }

      this.getAll({ refresh: true })
      .then(list => {
        resolve(this._list.find(x => x.id == value));
      })
      .catch(err => reject(err));
      
    })
  }

  add(value: ICompanyFormValues): Promise<Company> {
    return new Promise((resolve, reject) => {
      this._api.create(value).subscribe({
        next: res => {
          let company = new Company({ data: res, nzModalService: this._nzModalService, api: this._api });
          this._list.push(company);
          resolve(company);
        },
        error: err => {
          reject(err);
        }
      })
    })
  }
}