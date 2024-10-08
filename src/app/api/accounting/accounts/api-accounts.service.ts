import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAccount } from '@app/common/accounting/accounts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAccountsService {
  private readonly _http: HttpClient = inject(HttpClient);
  constructor() { }

  public create(data: { code: string, name: string, description?: string | null }): Observable<IAccount>{
    return  this._http.post<IAccount>("accounting/accounts", data);
  }

  public getAll(): Observable<IAccount[]> {
    return this._http.get<IAccount[]>("accounting/accounts")
  }
  
  public getTree(): Observable<any[]>{
    return this._http.get<any[]>("accounting/accounts?type=tree")
  }

  public update(id: string, data: { code?: string, name?: string, description?: string | null }): Observable<IAccount> {
    return this._http.put<IAccount>(`accounting/accounts/${id}`, data);
  }
}
