import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APICiiuCode } from '@api/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCiiuService {

  constructor(private readonly _http: HttpClient) { }

  getAll(): Observable<APICiiuCode[]>{
    return this._http.get<APICiiuCode[]>("data/ciiu");
  }
}
