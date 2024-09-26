import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public readonly isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor() { }
}
