import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APICompanyInfo } from '@api/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCompaniesService {

  constructor(private readonly _http: HttpClient) { }


  getAll(): Observable<APICompanyInfo[]> {
    return this._http.get<APICompanyInfo[]>("companies");
  }

  get(value: string){

  }

  update(id: string, data: any): Observable<APICompanyInfo> {
    return this._http.put<APICompanyInfo>(`companies/${id}`, data);
  }
}
