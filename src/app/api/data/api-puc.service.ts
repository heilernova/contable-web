import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIDataPucAccount } from '@api/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPucService {

  constructor(private readonly _http: HttpClient) { }

  getAll(tree?: false): Observable<APIDataPucAccount[]>
  getAll(tree?: true): Observable<APIPucTree>
  getAll(tree?: boolean) {
    return this._http.get<APIDataPucAccount[] | APIPucTree>("data/puc", { params: tree ? { "type": "tree" } : undefined});
  }
}


export type APIPucTree = {
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