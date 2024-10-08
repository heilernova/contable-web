import { inject, Injectable } from '@angular/core';
import { APIAuthResponse } from '@api/interfaces';
import { ApiAuthService } from '@app/api/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly _apiAuth = inject(ApiAuthService);
  private readonly _platform = inject(Platform);
  private _session: ISessionData | null = null;
  
  public readonly sessionChange = new BehaviorSubject<ISessionData | null>(null);
  public readonly isLoggedInChange = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  public get session(){
    return this._session;
  }

  private set(data: ISessionData | null){
    if (this._platform.isBrowser){
    
      if (data){
        localStorage.setItem("session", btoa(JSON.stringify(data)));
      } else {
        localStorage.removeItem("session");
      }
    }
    this._session = data;
    this.sessionChange.next(data);
    this.isLoggedInChange.next(this._session ? true : false); 
  }

  public init(){
    if (this._platform.isBrowser){
      let sessionString: string | null = localStorage.getItem("session");
      if (sessionString){
        let jsonObject: ISessionData = JSON.parse(atob(sessionString));
        this.set(jsonObject);
        this.verifySession(jsonObject.company?.id  ?? undefined);
      }
    }
  }

  signIn(credentials: { username: string, password: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      this._apiAuth.signIn(credentials).subscribe({
        next: res => {
          this.set(res);
          resolve();
        },
        error: err => {
          reject(err);
        }
      })
    })
  }

  verifySession(companyId?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._apiAuth.verifySession(companyId).subscribe({
        next: res => {
          this.set(res);
          resolve(true);
        },
        error: err => {
          resolve(false);
        }
      })
    });
  }

  logout(): void {
    this.set(null);
  }
}


export interface ISessionData {
  id: string;
  name: string;
  role: "admin" | "user" | "customer";
  isAccountant: boolean;
  permissions: string[];
  company?: {
    id: string;
    nit: string;
    name: string;
  };
  pin: string | null;
  token: string;
}