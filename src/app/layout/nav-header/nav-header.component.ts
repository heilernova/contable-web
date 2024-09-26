import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [
    NzMenuModule
  ],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {

}
