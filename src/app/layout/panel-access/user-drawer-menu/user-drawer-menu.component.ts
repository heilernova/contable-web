import { Component, inject } from '@angular/core';
import { SessionService } from '@app/authentication';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-user-drawer-menu',
  standalone: true,
  imports: [
    NzButtonModule
  ],
  templateUrl: './user-drawer-menu.component.html',
  styleUrl: './user-drawer-menu.component.scss'
})
export class UserDrawerMenuComponent {
  private readonly _session = inject(SessionService);
  private readonly _nzDrawerRef = inject(NzDrawerRef)


  constructor(){
    
  }

  onCloseSession(): void {
    this._session.logout();
    this._nzDrawerRef.close();
  }
}
