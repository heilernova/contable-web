import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLocationsService {
  private _httpClient: HttpClient;
  private _list: IDepartment[] = [];

  constructor(httpBackend: HttpBackend){
    this._httpClient = new HttpClient(httpBackend);
  }
  
  get(): Promise<IDepartment[]> {
    return new Promise((resolve, reject) => {

      if (this._list.length > 0){
        resolve(this._list);
        return;
      }

      this._httpClient.get<APITerritory[]>("https://novah.dev/api/data/world/territories?country=co&with-cities")
      .subscribe({
        next: res => {

          let list = res.map(x => {
            return {
              code: x.code,
              name: x.name,
              cities: x.cities.map(y => {
                return {
                  code: y.code,
                  name: y.name
                }
              })
            }
          })
          this._list = list;
          resolve(list)
        },
        error: err => reject(err)
      })
    })
  }
}


export interface IDepartment {
  code: string;
  name: string;
  cities: ICity[];
}

export interface ICity {
  code: string;
  name: string;
}

export interface APITerritory {
  id: string;
  country: string;
  code: string;
  name: string;
  cities: {
    id: string,
    code: string,
    name: string,
  }[]
}