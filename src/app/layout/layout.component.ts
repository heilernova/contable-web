import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { PanelAccessComponent } from "./panel-access/panel-access.component";
import { NavHeaderComponent } from "./nav-header/nav-header.component";
import { NavLateralComponent } from "./nav-lateral/nav-lateral.component";
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [BreadcrumbsComponent, PanelAccessComponent, NavHeaderComponent, NavLateralComponent, NzDrawerModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
