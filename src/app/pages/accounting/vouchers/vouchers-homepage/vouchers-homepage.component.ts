import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-vouchers-homepage',
  standalone: true,
  imports: [
    NzButtonModule,
    RouterLink
  ],
  templateUrl: './vouchers-homepage.component.html',
  styleUrl: './vouchers-homepage.component.scss'
})
export class VouchersHomepageComponent {

}
