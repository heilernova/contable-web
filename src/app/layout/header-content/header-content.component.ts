import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '@app/authentication';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PanelAccessComponent } from "../panel-access/panel-access.component";
import { NzDrawerPlacement, NzDrawerService } from 'ng-zorro-antd/drawer';
import { UserDrawerMenuComponent } from '../panel-access/user-drawer-menu/user-drawer-menu.component';

@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [
    RouterLink,
    NzButtonModule,
    PanelAccessComponent
],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.scss'
})
export class HeaderContentComponent {
  private readonly _session: SessionService = inject(SessionService);
  private readonly _drawerService: NzDrawerService = inject(NzDrawerService);
  public readonly isLoggedIn = signal<boolean>(false);
  public readonly user = signal<string>("");
  public readonly company = signal<string>("");
  public readonly companyShow = computed(() => this.company().length > 0);

  constructor(){
    this._session.sessionChange.subscribe(value => {
      if (value) {
        this.isLoggedIn.set(true);
        this.user.set(value.name);
      } else {
        this.isLoggedIn.set(false);
      }
    })
  }


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
