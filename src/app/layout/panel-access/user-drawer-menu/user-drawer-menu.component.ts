import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

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

}
