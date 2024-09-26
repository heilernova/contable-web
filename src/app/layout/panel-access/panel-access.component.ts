import { Component, inject, signal } from '@angular/core';
import { NzDrawerModule, NzDrawerPlacement, NzDrawerService } from 'ng-zorro-antd/drawer';
import { SessionService } from '@app/authentication';
import { UserDrawerMenuComponent } from './user-drawer-menu/user-drawer-menu.component';


@Component({
  selector: 'app-panel-access',
  standalone: true,
  imports: [
    NzDrawerModule
  ],
  templateUrl: './panel-access.component.html',
  styleUrl: './panel-access.component.scss'
})
export class PanelAccessComponent {
  private readonly _session: SessionService = inject(SessionService);
  private readonly _drawerService: NzDrawerService = inject(NzDrawerService);

  public readonly isLoggedIn = signal<boolean>(false);

  visible = false;
  placement: NzDrawerPlacement = 'right';

  open(): void {
    const drawer = this._drawerService.create({
      nzTitle: "Heiler Nova",
      nzContent: UserDrawerMenuComponent
    })
  }

  close(): void {
    this.visible = false;
  }
}
