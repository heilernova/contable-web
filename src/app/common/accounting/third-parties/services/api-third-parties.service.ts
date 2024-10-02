import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIAccountingThirdCreate, APIAccountingThirdInfo, APIAccountingThirdUpdate } from '@api/interfaces';
import { map, Observable } from 'rxjs';
import { IThird } from '../third.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiThirdPartiesService {
  private readonly _http = inject(HttpClient);
  constructor() { }

  parse(data: APIAccountingThirdInfo): IThird {
    return {
      id: data.id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      tagId: data.tagId,
      taxpayerType: data.taxpayerType,
      nit: data.nit,
      accountName: data.accountName,
      name: data.name,
      lastName: data.lastName,
      companyName: data.companyName,
      tradeName: data.tradeName,
      isSupplier: data.isSupplier,
      isCustomer: data.isCustomer,
      department: data.department,
      city: data.city,
      address: data.address,
      email: data.email,
      cellphone: data.cellphone,
      economicActivities: data.economicActivities,
      responsibilities: data.responsibilities
    }
  }

  getAll(): Observable<IThird[]>{
    return this._http.get<APIAccountingThirdInfo[]>("accounting/third-parties").pipe(map(list => {
      return list.map(x => this.parse(x))
    }));
  }

  create(data: APIAccountingThirdCreate): Observable<IThird> {
    return this._http.post<APIAccountingThirdInfo>("accounting/third-parties", data).pipe(map(res => {
      return this.parse(res);
    }));
  }
  
  update(id: string, data: APIAccountingThirdUpdate): Observable<IThird> {
    return this._http.put<APIAccountingThirdInfo>(`accounting/third-parties/${id}`, data).pipe(map(x => this.parse(x)));
  }
}
