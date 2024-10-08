import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiVoucherTypesService {
  private readonly _http: HttpClient = inject(HttpClient);
  constructor() { }

  update(id: string, data: { name?: string, abbreviation?: string | null, description?: string | null }): Observable<void> {
    return this._http.post<void>("", data)
  }
}
