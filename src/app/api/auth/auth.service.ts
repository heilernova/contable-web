import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIAuthCredentials, APIAuthResponse } from '@api/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private readonly _http: HttpClient) { }

  public signIn(credentials: APIAuthCredentials): Observable<APIAuthResponse>{
    return this._http.post<APIAuthResponse>("sign-in", credentials);
  }

  public verifySession(companyId?: string): Observable<APIAuthResponse> {
    let params: { "company"?: string } = {};

    if (companyId){
      params.company = companyId;
    }

    return this._http.get<APIAuthResponse>("verify-session", { params });
  }
}
