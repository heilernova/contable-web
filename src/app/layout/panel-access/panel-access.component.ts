import { Component, inject } from '@angular/core';
import { NzDrawerModule, NzDrawerPlacement, NzDrawerService } from 'ng-zorro-antd/drawer';
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
  private readonly _drawerService: NzDrawerService = inject(NzDrawerService);

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
