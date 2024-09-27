import { Component, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { PanelAccessComponent } from "./panel-access/panel-access.component";
import { NavHeaderComponent } from "./nav-header/nav-header.component";
import { NavLateralComponent } from "./nav-lateral/nav-lateral.component";
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { LayoutService } from './layout.service';
import { HeaderContentComponent } from "./header-content/header-content.component";
import { SessionService } from '@app/authentication';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    PanelAccessComponent,
    NavHeaderComponent,
    NavLateralComponent,
    NzDrawerModule,
    HeaderContentComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  host: {
    "[class.logged-in]": "loggedIn()"
  }
})
export class LayoutComponent {
  private readonly _layout = inject(LayoutService);
  private readonly _session = inject(SessionService);
  public loggedIn = signal<boolean>(false);

  constructor(){
    this._session.isLoggedInChange.subscribe(value => this.loggedIn.set(value));
  }
}
